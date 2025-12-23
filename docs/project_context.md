# Project: Kube Santa 🎅

## Concept

Kubernetes の概念をクリスマスの世界観で学ぶ教育用 Web アプリ。
「あるべき状態 (Desired State)」を維持する仕組みを体験させる。

## Dictionary (Metaphor Mapping)

| K8s Term | App Term | Description |
| :--- | :--- | :--- |
| **Cluster** | **夜空 (Night Sky)** | アプリの背景。 |
| **Pod** | **ソリ (Sleigh) 🛷** | 生成・消滅する最小単位。 |
| **ReplicaSet** | **魔法の契約書 📜** | 設定数 (Desired State) を管理。 |
| **Deployment** | **クリスマス作戦** | 全体管理。 |
| **Scaling** | **増員** | ソリの数を変更する行為。 |
| **Self-healing**| **復活の魔法 ✨** | 減少を検知して自動生成する挙動。 |
| **Chaos Monkey**| **イタズラ猿 🐒** | ソリを破壊するランダム要素。 |

## Core Logic: Reconciliation Loop

フロントエンドで擬似的なループを実装する。

Loop:

  1. `Current State` (現在のソリの数) を観測。
  2. `Desired State` (設定値) と比較。
  3. 差異があれば、Create または Delete アクションを実行。
