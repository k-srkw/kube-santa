import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

interface Letter {
  id: number;
  x: number;
  y: number;
  processed: boolean;
  assignedSleighId?: number;
  queued?: boolean; // キューに追加されたかどうか
  processing?: boolean; // 処理中かどうか
}

interface Present {
  id: number;
  x: number;
  y: number;
}

interface SleighPosition {
  id: number;
  x: number;
  y: number;
}

// 定数定義
const LETTER_MOVEMENT_INTERVAL = 80; // 手紙移動更新間隔（ms）
const LETTER_MOVE_SPEED = 10; // 手紙の移動速度
const LETTER_PROCESSING_DISTANCE = 100; // ソリとの処理距離
const LETTER_FALLBACK_MOVE_SPEED = 15; // ソリがない場合の手紙の移動速度
const MAX_LETTERS_TO_PROCESS = 100; // 一度に処理する手紙の最大数
const PRESENT_CLEANUP_THRESHOLD = 50; // プレゼントのクリーンアップ閾値
const PRESENT_KEEP_COUNT = 30; // 保持するプレゼントの数

// 動的閾値の計算関数
const getWarningThreshold = (desiredState: number): number => {
  // 1台の場合は15個（既存の挙動を維持）、それ以上は動的に計算
  if (desiredState === 1) {
    return 15;
  }
  // 2台以上: 15 + (desiredState * 1.5)
  // 5台: 15 + (5 * 1.5) = 22.5 → 23個以上
  // 10台: 15 + (10 * 1.5) = 30個以上
  return 15 + Math.floor(desiredState * 1.5);
};

// 警告メッセージの取得関数
const getWarningMessage = (unprocessedCount: number, desiredState: number): string => {
  const threshold = getWarningThreshold(desiredState);
  
  if (unprocessedCount >= threshold) {
    // 最大レプリカ数に関係なく、常に同じメッセージを表示
    return '手紙が多すぎます！ソリを増やしてください';
  }
  return '';
};

// 手紙生成間隔は固定（レプリカ数5で警告が出ないように設定）
// レプリカ数5の閾値は22個（15 + Math.floor(5 * 1.5) = 22）
// 5台のソリが処理できる速度で手紙を生成するように設定
const FIXED_LETTER_GENERATION_INTERVAL = 400; // レプリカ数5で警告が出ないように調整

function App() {
  const [desiredState, setDesiredState] = useState(0);
  const [pods, setPods] = useState<number[]>([]);
  const [notification, setNotification] = useState<string>('');
  const [elfMessage, setElfMessage] = useState<string>('');
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [presents, setPresents] = useState<Present[]>([]);
  const [isLetterFloodActive, setIsLetterFloodActive] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [sleighPositions, setSleighPositions] = useState<SleighPosition[]>([]);
  const [sleighProcessingCounts, setSleighProcessingCounts] = useState<Record<number, number>>({}); // 処理済み手紙数
  const [sleighActiveProcessingCounts, setSleighActiveProcessingCounts] = useState<Record<number, number>>({}); // 処理中の手紙数（最大5つ）
  const [sleighProcessingQueues, setSleighProcessingQueues] = useState<Record<number, Letter[]>>({}); // 処理待ちキュー
  const nextIdRef = useRef(0);
  const previousDesiredStateRef = useRef(0);
  const sparkleIdRef = useRef(0);
  const letterIdRef = useRef(0);
  const presentIdRef = useRef(0);
  const currentSleighIndexRef = useRef(0);
  const selfHealingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nightSkyRef = useRef<HTMLDivElement>(null);
  const sleighActiveProcessingCountsRef = useRef<Record<number, number>>({}); // 処理中の手紙数（refで管理）
  const sleighProcessingQueuesRef = useRef<Record<number, Letter[]>>({}); // 処理待ちキュー（refで管理）

  // Reconciliation Logic: desiredStateが変更されたら、即座にpods配列を調整
  useEffect(() => {
    setPods((currentPods) => {
      const currentCount = currentPods.length;
      const previousDesired = previousDesiredStateRef.current;
      
      // desiredStateが0の場合は、すべてのソリを削除（最優先）
      if (desiredState === 0) {
        previousDesiredStateRef.current = 0;
        // Self-healingのタイマーもクリア
        if (selfHealingTimeoutRef.current) {
          clearTimeout(selfHealingTimeoutRef.current);
          selfHealingTimeoutRef.current = null;
        }
        // 確実に空配列を返す（currentCountに関係なく）
        return [];
      }
      
      if (currentCount < desiredState) {
        // ソリを追加
        const newPods = Array.from({ length: desiredState }, (_, i) => {
          if (i < currentCount) {
            return currentPods[i];
          }
          return nextIdRef.current++;
        });
        
        // レプリカ数が0から増加した場合、assignedSleighIdがundefinedの手紙を再割り当て
        if (currentCount === 0 && newPods.length > 0) {
          setLetters((prevLetters) => {
            return prevLetters.map((letter) => {
              // assignedSleighIdがundefinedの手紙を利用可能なソリに再割り当て
              if (!letter.assignedSleighId && !letter.processed) {
                const newAssignedSleighId = newPods[currentSleighIndexRef.current % newPods.length];
                currentSleighIndexRef.current = (currentSleighIndexRef.current + 1) % newPods.length;
                return {
                  ...letter,
                  assignedSleighId: newAssignedSleighId,
                };
              }
              return letter;
            });
          });
        }
        
        // Scalingイベント: desiredStateが増加した場合
        if (desiredState > previousDesired && previousDesired > 0) {
          // 手紙の殺到中の場合、特別なメッセージを表示
          if (isLetterFloodActive) {
            setElfMessage('これが増員（Scaling）だよ。忙しくなったらすぐに仲間を増やして対応できるのがクラウドの強みなんだ。');
          } else {
            setElfMessage('これは増員（Scaling）です！リソースを追加しました。');
          }
          setTimeout(() => setElfMessage(''), 5000);
        }
        
        previousDesiredStateRef.current = desiredState;
        return newPods;
      } else if (currentCount > desiredState) {
        // ソリを削除
        const newPods = currentPods.slice(0, desiredState);
        const removedSleighIds = currentPods.slice(desiredState);
        
        // 削除されたソリに割り当てられていた手紙を利用可能なソリに再割り当て
        if (removedSleighIds.length > 0 && newPods.length > 0) {
          setLetters((prevLetters) => {
            return prevLetters.map((letter) => {
              // 削除されたソリに割り当てられていた手紙を検索
              if (letter.assignedSleighId && removedSleighIds.includes(letter.assignedSleighId)) {
                // 利用可能なソリに再割り当て（ラウンドロビン方式）
                const newAssignedSleighId = newPods[currentSleighIndexRef.current % newPods.length];
                currentSleighIndexRef.current = (currentSleighIndexRef.current + 1) % newPods.length;
                return {
                  ...letter,
                  assignedSleighId: newAssignedSleighId,
                };
              }
              return letter;
            });
          });
        }
        
        previousDesiredStateRef.current = desiredState;
        return newPods;
      }
      // 変更がない場合は現在の状態を返す
      previousDesiredStateRef.current = desiredState;
      return currentPods;
    });
  }, [desiredState]);

  // Self-healing Logic: pods.length < desiredState の場合、1-2秒後に不足分を追加
  useEffect(() => {
    // 既存のタイマーをクリア
    if (selfHealingTimeoutRef.current) {
      clearTimeout(selfHealingTimeoutRef.current);
      selfHealingTimeoutRef.current = null;
    }
    
    // desiredStateが0の場合は、Self-healingを実行しない（最優先）
    if (desiredState === 0) {
      return;
    }
    
    if (pods.length < desiredState && desiredState > 0) {
      const delay = 1000 + Math.random() * 1000; // 1-2秒のランダム遅延
      const timeoutId = setTimeout(() => {
        setPods((currentPods) => {
          // desiredStateが0になった場合は、何もしない
          if (desiredState === 0) {
            return currentPods;
          }
          if (currentPods.length < desiredState) {
            const missingCount = desiredState - currentPods.length;
            const newPods = [...currentPods];
            for (let i = 0; i < missingCount; i++) {
              newPods.push(nextIdRef.current++);
            }
            // 通知を表示
            setNotification('魔法の契約書がソリを復活させました！');
            // 3秒後に通知を消す
            setTimeout(() => setNotification(''), 3000);
            // Self-healingイベント: エルフのメッセージを表示
            setElfMessage('これは復活の魔法（Self-healing）です！Kubernetesが目標状態を維持しています。');
            setTimeout(() => setElfMessage(''), 5000);
            return newPods;
          }
          return currentPods;
        });
        selfHealingTimeoutRef.current = null;
      }, delay);
      selfHealingTimeoutRef.current = timeoutId;
      return () => {
        if (selfHealingTimeoutRef.current) {
          clearTimeout(selfHealingTimeoutRef.current);
          selfHealingTimeoutRef.current = null;
        }
      };
    }
  }, [pods.length, desiredState]);

  const createSparkle = (x: number, y: number) => {
    const id = sparkleIdRef.current++;
    setSparkles((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((sparkle) => sparkle.id !== id));
    }, 600);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setDesiredState(newValue);
    // スパークルエフェクトを追加
    const rect = e.currentTarget.getBoundingClientRect();
    createSparkle(rect.left + rect.width / 2, rect.top);
  };

  const handleChaosMonkey = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pods.length > 0) {
      // ランダムに1つのソリを削除
      setPods((currentPods) => {
        const randomIndex = Math.floor(Math.random() * currentPods.length);
        return currentPods.filter((_, index) => index !== randomIndex);
      });
      // スパークルエフェクトを追加
      const rect = e.currentTarget.getBoundingClientRect();
      createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  const handleStartLetterFlood = () => {
    setIsLetterFloodActive(true);
  };

  const handleScaleUp = () => {
    if (desiredState < 10) {
      setDesiredState(desiredState + 1);
    }
  };

  const handleReset = () => {
    // Self-healingのタイマーをクリア
    if (selfHealingTimeoutRef.current) {
      clearTimeout(selfHealingTimeoutRef.current);
      selfHealingTimeoutRef.current = null;
    }
    // 手紙の殺到を停止（最優先）
    setIsLetterFloodActive(false);
    // previousDesiredStateRefを先にリセット
    previousDesiredStateRef.current = 0;
    // すべての状態をリセット
    setLetters([]);
    setPresents([]);
    setWarningMessage('');
    setNotification('');
    setElfMessage('');
    setSleighProcessingCounts({});
    setSleighActiveProcessingCounts({});
    setSleighProcessingQueues({});
    sleighActiveProcessingCountsRef.current = {};
    currentSleighIndexRef.current = 0;
    // desiredStateとpodsを明示的にリセット（Reconciliation Logicが確実に実行されるように）
    setDesiredState(0);
    setPods([]);
    // スパークルエフェクトを追加（オプション）
    if (nightSkyRef.current) {
      const rect = nightSkyRef.current.getBoundingClientRect();
      createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  // 手紙の生成（定期的に追加）と負荷分散による割り当て
  useEffect(() => {
    if (!isLetterFloodActive) return;

    const interval = setInterval(() => {
      if (nightSkyRef.current) {
        const rect = nightSkyRef.current.getBoundingClientRect();
        const y = Math.random() * (rect.height - 100) + 50; // 画面内のランダムな位置
        
        // ラウンドロビン方式でソリに割り当て（ソリがある場合のみ）
        let assignedSleighId: number | undefined = undefined;
        if (pods.length > 0) {
          assignedSleighId = pods[currentSleighIndexRef.current % pods.length];
          currentSleighIndexRef.current = (currentSleighIndexRef.current + 1) % pods.length;
          
          // エルフメッセージを表示（初回のみ）
          if (elfMessage === '') {
            setElfMessage('これが負荷分散（Load Balancing）だよ。手紙を複数のサンタさんに分けて処理することで、1つのサンタさんに負荷が集中しないようにしているんだ。');
          }
        }
        
        setLetters((prev) => [
          ...prev,
          {
            id: letterIdRef.current++,
            x: 0, // 画面左端から開始
            y: y,
            processed: false,
            assignedSleighId: assignedSleighId,
          },
        ]);
      }
    }, FIXED_LETTER_GENERATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isLetterFloodActive, elfMessage]);

  // 手紙がソリに割り当てられていない場合の移動処理
  const moveLetterWithoutSleigh = (letter: Letter): Letter | null => {
    if (!nightSkyRef.current) return letter;
    const newX = letter.x + LETTER_FALLBACK_MOVE_SPEED;
    if (newX > nightSkyRef.current.clientWidth + 100) {
      return null;
    }
    return {
      ...letter,
      x: newX,
    };
  };

  // 手紙をプレゼントに変換する処理
  const convertLetterToPresent = useCallback((letter: Letter, sleighX: number, sleighY: number) => {
    setPresents((prev) => [
      ...prev,
      {
        id: presentIdRef.current++,
        x: sleighX,
        y: sleighY,
      },
    ]);
    createSparkle(sleighX, sleighY);
    // 処理済み手紙数を増やす
    setSleighProcessingCounts((prev) => ({
      ...prev,
      [letter.assignedSleighId!]: (prev[letter.assignedSleighId!] || 0) + 1,
    }));
    // 処理中の手紙数を減らす（refとstateの両方を更新）
    sleighActiveProcessingCountsRef.current[letter.assignedSleighId!] = Math.max(0, (sleighActiveProcessingCountsRef.current[letter.assignedSleighId!] || 0) - 1);
    setSleighActiveProcessingCounts((prev) => ({
      ...prev,
      [letter.assignedSleighId!]: sleighActiveProcessingCountsRef.current[letter.assignedSleighId!],
    }));
    // 手紙を処理済みとしてマーク
    setLetters((prevLetters) => {
      return prevLetters.map((l) => {
        if (l.id === letter.id) {
          return {
            ...l,
            processed: true,
            processing: false,
          };
        }
        return l;
      });
    });
  }, []);

  // 手紙の移動と負荷分散による処理
  useEffect(() => {
    if (letters.length === 0 || !isLetterFloodActive) return;

    const interval = setInterval(() => {
      setLetters((prevLetters) => {
        // 手紙の数が多すぎる場合は古いものを削除（パフォーマンス対策）
        const lettersToProcess = prevLetters.length > MAX_LETTERS_TO_PROCESS 
          ? prevLetters.slice(-MAX_LETTERS_TO_PROCESS) 
          : prevLetters;
        
        return lettersToProcess.map((letter) => {
          if (letter.processed) return letter;

          // ソリが割り当てられていない場合は右に移動
          if (!letter.assignedSleighId) {
            return moveLetterWithoutSleigh(letter);
          }
          
          // 割り当てられたソリの位置を取得
          const assignedSleigh = sleighPositions.find((pos) => pos.id === letter.assignedSleighId);
          if (!assignedSleigh || !nightSkyRef.current) {
            return moveLetterWithoutSleigh(letter);
          }

          const nightSkyRect = nightSkyRef.current.getBoundingClientRect();

          // キューに追加された手紙または処理中の手紙の場合、位置を計算
          if ((letter.queued || letter.processing) && letter.assignedSleighId) {
            // refから最新の値を取得
            const queue = sleighProcessingQueuesRef.current[letter.assignedSleighId] || [];
            const activeCount = sleighActiveProcessingCountsRef.current[letter.assignedSleighId] || 0;
            
            // 処理中の手紙の場合
            if (letter.processing) {
              // 処理中の手紙のインデックスを取得（処理開始順）
              // 処理中の手紙は、ソリのすぐ近くに配置
              // 処理中の手紙の順序は、処理開始順に基づく（簡易的にactiveCountを使用）
              const processingIndex = activeCount - 1; // 最新の処理中の手紙が最後
              const offsetX = processingIndex * 50;
              const offsetY = (processingIndex % 2) * 30;
              
              return {
                ...letter,
                x: assignedSleigh.x - nightSkyRect.left + offsetX,
                y: assignedSleigh.y - nightSkyRect.top + offsetY,
              };
            }
            
            // キューに追加された手紙の場合
            if (letter.queued) {
              const queueIndex = queue.findIndex((q) => q.id === letter.id);
              if (queueIndex >= 0) {
                // 処理中の手紙の後ろに配置
                const offsetX = (activeCount + queueIndex) * 60; // 手紙の幅 + 間隔
                const offsetY = (queueIndex % 2) * 30; // 交互に上下に配置
                
                return {
                  ...letter,
                  x: assignedSleigh.x - nightSkyRect.left + offsetX,
                  y: assignedSleigh.y - nightSkyRect.top + offsetY,
                };
              }
              // キューに含まれていない場合でも、queued: trueの場合はソリの近くに配置
              // （キューから削除されたが、まだ処理されていない場合）
              return {
                ...letter,
                x: assignedSleigh.x - nightSkyRect.left + activeCount * 60,
                y: assignedSleigh.y - nightSkyRect.top,
              };
            }
          }

          // 通常の手紙の移動処理
          const letterScreenX = nightSkyRect.left + letter.x;
          const letterScreenY = nightSkyRect.top + letter.y;
          const sleighScreenX = assignedSleigh.x;
          const sleighScreenY = assignedSleigh.y;

          const dx = sleighScreenX - letterScreenX;
          const dy = sleighScreenY - letterScreenY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < LETTER_PROCESSING_DISTANCE) {
            // ソリに到達！処理キューに追加（即座に処理しない）
            if (!letter.processed && !letter.queued && letter.assignedSleighId) {
              setSleighProcessingQueues((prevQueues) => {
                const queue = prevQueues[letter.assignedSleighId!] || [];
                // 既にキューに含まれていない場合のみ追加
                if (!queue.find((q) => q.id === letter.id)) {
                  return {
                    ...prevQueues,
                    [letter.assignedSleighId!]: [...queue, letter],
                  };
                }
                return prevQueues;
              });
              // キューに追加されたことをマーク
              return {
                ...letter,
                queued: true,
              };
            }
            // 既にキューに追加されている場合はそのまま返す
            return letter;
          } else {
            // ソリに向かって移動
            const moveX = (dx / distance) * LETTER_MOVE_SPEED;
            const moveY = (dy / distance) * LETTER_MOVE_SPEED;
            const newX = letter.x + moveX;
            const newY = letter.y + moveY;

            // 画面外に出た手紙を削除
            if (newX > nightSkyRef.current.clientWidth + 100 || newX < -100) {
              return null;
            }

            return {
              ...letter,
              x: newX,
              y: newY,
            };
          }
        }).filter((letter): letter is Letter => letter !== null);
      });
    }, LETTER_MOVEMENT_INTERVAL);

    return () => clearInterval(interval);
  }, [letters.length, sleighPositions, isLetterFloodActive, sleighProcessingQueues, sleighActiveProcessingCounts]);

  // ソリの位置を追跡
  useEffect(() => {
    const updateSleighPositions = () => {
      const sleighElements = document.querySelectorAll('[data-testid="sleigh"]');
      const positions: SleighPosition[] = [];
      sleighElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        positions.push({
          id: pods[index] || index,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      });
      setSleighPositions(positions);
    };

    const interval = setInterval(updateSleighPositions, 100);
    updateSleighPositions();

    return () => clearInterval(interval);
  }, [pods]);

  // sleighProcessingQueuesのrefを更新
  useEffect(() => {
    sleighProcessingQueuesRef.current = sleighProcessingQueues;
  }, [sleighProcessingQueues]);

  // 各ソリの処理キューから手紙を取り出して処理（最大処理数制限: 5つ）
  useEffect(() => {
    if (pods.length === 0) return;

    const interval = setInterval(() => {
      pods.forEach((podId) => {
        // 処理中の手紙数をrefから取得
        const activeCount = sleighActiveProcessingCountsRef.current[podId] || 0;
        const maxProcessing = 5; // 最大処理数

        // 処理中の手紙数が最大数未満の場合、キューから手紙を取り出して処理
        if (activeCount < maxProcessing) {
          // キューから手紙を取得
          setSleighProcessingQueues((prevQueues) => {
            const queue = prevQueues[podId] || [];
            if (queue.length === 0) return prevQueues;

            const letterToProcess = queue[0];
            if (!letterToProcess || letterToProcess.assignedSleighId !== podId) {
              // 不正な手紙の場合はキューから削除
              return {
                ...prevQueues,
                [podId]: queue.slice(1),
              };
            }

            // sleighPositionsから位置を取得、見つからない場合はDOMから直接取得
            let sleighPosition = sleighPositions.find((pos) => pos.id === podId);
            if (!sleighPosition) {
              // DOMから直接位置を取得
              const sleighElements = document.querySelectorAll('[data-testid="sleigh"]');
              const podIndex = pods.indexOf(podId);
              if (sleighElements[podIndex]) {
                const rect = sleighElements[podIndex].getBoundingClientRect();
                sleighPosition = {
                  id: podId,
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                };
              }
            }
            
            if (sleighPosition) {
              // 処理中の手紙数を増やす（refとstateの両方を更新）
              sleighActiveProcessingCountsRef.current[podId] = (sleighActiveProcessingCountsRef.current[podId] || 0) + 1;
              setSleighActiveProcessingCounts((prev) => ({
                ...prev,
                [podId]: sleighActiveProcessingCountsRef.current[podId],
              }));
              
              // 手紙を処理中としてマーク
              setLetters((prevLetters) => {
                return prevLetters.map((l) => {
                  if (l.id === letterToProcess.id) {
                    return {
                      ...l,
                      processing: true,
                    };
                  }
                  return l;
                });
              });
              
              // 手紙を処理（プレゼントに変換）- 即座に実行
              convertLetterToPresent(letterToProcess, sleighPosition.x, sleighPosition.y);
            }
            
            // キューから削除
            return {
              ...prevQueues,
              [podId]: queue.slice(1),
            };
          });
        }
      });
    }, 50); // 50ms間隔でチェック（より頻繁にチェック）

    return () => clearInterval(interval);
  }, [pods, sleighPositions, convertLetterToPresent]);

  // オーバーフロー検知
  useEffect(() => {
    if (!isLetterFloodActive) {
      setWarningMessage('');
      return;
    }
    const unprocessedCount = letters.filter((l) => !l.processed).length;
    const message = getWarningMessage(unprocessedCount, desiredState);
    setWarningMessage(message);
  }, [letters, isLetterFloodActive, desiredState]);

  // プレゼントの自動削除
  useEffect(() => {
    const interval = setInterval(() => {
      setPresents((prev) => {
        if (prev.length > PRESENT_CLEANUP_THRESHOLD) {
          // 古いプレゼントを削除（パフォーマンス対策）
          return prev.slice(-PRESENT_KEEP_COUNT);
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 via-green-600 to-yellow-400 text-white py-4 px-6 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 relative z-10">
          <span className="text-2xl">🎄</span>
          <h1 className="text-3xl font-bold">🎅 Kube Santa - プレゼント戦略</h1>
          <span className="text-2xl">⭐</span>
          <span className="text-2xl">🔔</span>
        </div>
        <div className="absolute top-0 left-0 right-0 flex justify-between px-4 opacity-50">
          <span className="text-xl">❄️</span>
          <span className="text-xl">⭐</span>
          <span className="text-xl">🎁</span>
          <span className="text-xl">❄️</span>
        </div>
      </header>

      {/* Night Sky Area (Cluster) */}
      <div
        ref={nightSkyRef}
        data-testid="night-sky"
        className="flex-grow bg-gradient-to-b from-blue-900 via-purple-900 to-blue-800 relative overflow-hidden flex flex-wrap items-center justify-center gap-8 p-8"
      >
        {/* Letters */}
        {letters.map((letter) => (
          <div
            key={letter.id}
            data-testid="letter"
            className="absolute text-3xl z-20 pointer-events-none"
            style={{
              left: `${letter.x}px`,
              top: `${letter.y}px`,
              opacity: letter.processed ? 0 : (letter.queued ? 0.5 : 1), // キューに追加された手紙は半透明に
              transition: 'opacity 0.3s',
              willChange: 'transform',
            }}
          >
            ✉️
          </div>
        ))}

        {/* Presents */}
        {presents.map((present) => (
          <div
            key={present.id}
            data-testid="present"
            className="fixed text-4xl z-20 pointer-events-none"
            style={{
              left: `${present.x}px`,
              top: `${present.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            🎁
          </div>
        ))}
        {/* Stars */}
        {useMemo(() => {
          return Array.from({ length: 20 }).map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const animationDelay = Math.random() * 2;
            const animationDuration = 1 + Math.random() * 2;
            return (
              <div
                key={`star-${i}`}
                data-testid="star"
                className="absolute text-2xl animate-pulse"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${animationDelay}s`,
                  animationDuration: `${animationDuration}s`,
                }}
              >
                ⭐
              </div>
            );
          });
        }, [])}

        {/* Snowflakes */}
        {useMemo(() => {
          return Array.from({ length: 15 }).map((_, i) => {
            const left = Math.random() * 100;
            const top = -10 + Math.random() * 20;
            const animationDelay = Math.random() * 3;
            const animationDuration = 3 + Math.random() * 2;
            return (
              <div
                key={`snowflake-${i}`}
                data-testid="snowflake"
                className="absolute text-xl text-white animate-bounce"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${animationDelay}s`,
                  animationDuration: `${animationDuration}s`,
                }}
              >
                ❄️
              </div>
            );
          });
        }, [])}

        {/* Sleighs with Santa */}
        {pods.map((index) => (
          <div
            key={index}
            data-testid="sleigh"
            className="text-6xl relative z-10 animate-bounce"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))',
              animation: `bounce 2s infinite, float ${3 + index * 0.5}s ease-in-out infinite`,
            }}
            role="img"
            aria-label="sleigh"
          >
            🎅🛷
            {/* 処理カウンター */}
            <div
              data-testid="processing-count"
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-red-800 font-bold text-sm px-2 py-1 rounded-full shadow-lg whitespace-nowrap z-20"
            >
              処理: {sleighProcessingCounts[index] || 0}
            </div>
          </div>
        ))}
      </div>

      {/* Control Panel */}
      <div
        data-testid="control-panel"
        className="bg-gradient-to-r from-red-800 via-green-800 to-red-800 border-t-4 border-yellow-400 p-6 shadow-2xl relative"
      >
        <div className="absolute top-2 left-4 text-2xl">🎄</div>
        <div className="absolute top-2 right-4 text-2xl">⭐</div>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            <div>
              <label htmlFor="desired-state-slider" className="block text-white text-lg font-semibold mb-2 flex items-center gap-2">
                <span>🎄</span>
                <span>サンタさん (Pod) の数</span>
                <span>🔔</span>
              </label>
              <input
                id="desired-state-slider"
                data-testid="desired-state-slider"
                type="range"
                min="0"
                max="10"
                value={desiredState}
                onChange={handleSliderChange}
                className="w-full h-4 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between text-white text-sm mt-1">
                <span>0</span>
                <span className="font-bold text-yellow-400">{desiredState}</span>
                <span>10</span>
              </div>
            </div>
            <div>
              <p
                data-testid="status-text"
                className="text-white text-xl font-bold text-center bg-slate-700 px-4 py-2 rounded-lg"
              >
                いて欲しいサンタさん: {desiredState} / 今いるサンタさん: {pods.length}
              </p>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                data-testid="start-letter-flood-button"
                onClick={handleStartLetterFlood}
                disabled={isLetterFloodActive}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
              >
                {isLetterFloodActive ? '✉️ 手紙の殺到中...' : '✉️ 手紙の殺到を開始'}
              </button>
              <button
                data-testid="scale-up-button"
                onClick={handleScaleUp}
                disabled={desiredState >= 10}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
              >
                ⬆️ スケールアップ
              </button>
              <button
                data-testid="chaos-monkey-button"
                onClick={handleChaosMonkey}
                disabled={pods.length === 0}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
              >
                🐒 イタズラ猿を呼ぶ
              </button>
              <button
                data-testid="reset-button"
                onClick={handleReset}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all transform hover:scale-105 active:scale-95"
              >
                🔄 リセット
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Message */}
      {warningMessage && (
        <div
          data-testid="warning-message"
          className="fixed top-4 left-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-2xl text-lg font-bold z-50 animate-pulse"
        >
          ⚠️ {warningMessage}
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div
          data-testid="notification"
          className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl text-lg font-bold z-50 animate-pulse"
        >
          ✨ {notification}
        </div>
      )}

      {/* Elf Guide */}
      <div className="fixed bottom-4 right-4 z-50 flex items-end gap-2">
        {elfMessage && (
          <div
            data-testid="elf-message"
            className="bg-yellow-100 border-2 border-yellow-400 rounded-lg px-4 py-3 shadow-2xl max-w-xs text-sm font-semibold text-gray-800 animate-bounce"
          >
            {elfMessage}
          </div>
        )}
        <div className="text-6xl" role="img" aria-label="elf">
          🧝
        </div>
      </div>

      {/* Sparkle Effects */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          data-testid="sparkle"
          className="fixed pointer-events-none z-50 sparkle-effect"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className="text-3xl">✨</span>
        </div>
      ))}
    </div>
  )
}

export default App

