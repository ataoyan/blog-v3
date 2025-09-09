---
title: 基于QThread的多线程任务管理
date: 2025-01-14 14:04:30
categories: [代码]
image: https://cdn.atao.cyou/Cover/cover_250122_164231.png
tags: [python]
description: 介绍如何用Python实现多线程任务管理，包含基本原理和代码示例。
type: story
---

### 开发背景

在开发一个 `PyQt` 应用程序时，我们经常需要执行一些耗时的操作，例如`文件读写`{lang="ini"}、`网络请求`{lang="ini"}、`复杂的数据处理`{lang="ini"}或`长时间的计算`{lang="ini"}。如果这些操作在主线程中执行，会导致用户界面（UI）冻结，用户无法与应用程序进行交互，影响用户体验。为了解决这个问题，我们需要将这些耗时操作放在单独的线程中执行。

然而，直接使用多线程会带来一些复杂性，例如线程的`创建`{lang="ini"}、`管理`{lang="ini"}、`信号`{lang="ini"}和`槽机制`{lang="ini"}的使用，以及在多线程环境下处理异常和结果的传递等。为了简化这些操作，因此开发了 `Task`{lang="yaml"} 和 `TaskManager`{lang="yaml"} 类。

### 功能实现

```python
from PyQt5.QtCore import QThread, pyqtSignal

class Task(QThread):
    """
    Task class to run a task in a separate thread.
    """
    success_signal = pyqtSignal(object)
    fail_signal = pyqtSignal(Exception)
    finished_signal = pyqtSignal()

    def __init__(self, func, *args):
        super().__init__()
        self.func = func
        self.args = args

    def run(self):
        try:
            r = self.func(*self.args)
            self.success_signal.emit(r)
        except Exception as e:
            self.fail_signal.emit(e)
        self.finished_signal.emit()

    def onSuccess(self, func):
        self.success_signal.connect(func)
        return self

    def onFail(self, func):
        self.fail_signal.connect(func)
        return self

    def onFinished(self, func):
        self.finished_signal.connect(func)
        return self

class TaskManager:
    """
    TaskManager class to manage multiple tasks.
    """
    _instance = None
    _tasks = {}

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    @classmethod
    def create_task(cls, func, *args, **kwargs):
        if "label" in kwargs:
            label = kwargs["label"]
        else:
            label = "null"
        task = Task(func, *args)
        if label not in cls._tasks:
            cls._tasks[label] = [task]
        else:
            cls._tasks[label].append(task)
        return task

    @classmethod
    def run_task(cls, task: Task):
        task.start()
        task.onFinished(lambda: cls.remove_task(task))
        return task

    @classmethod
    def run_tasks(cls, tasks: list):
        for task in tasks:
            if isinstance(task, Task):
                cls.run_task(task)

    @classmethod
    def remove_task(cls, task: Task):
        for key, value in cls._tasks.items():
            if task in value:
                value.remove(task)
                if len(value) == 0:
                    cls._tasks.pop(key)
                break

    @classmethod
    def is_idle(cls, label: str = "null"):
        return label not in cls._tasks

    @classmethod
    def is_all_idle(cls):
        return len(cls._tasks) == 0
```

### 方法解释

-   **线程执行**：`Task` 类继承自 `QThread`，它的主要目的是将一个函数封装在一个单独的线程中执行。这样，我们可以将耗时的操作封装在 `Task` 类的 `func` 方法中，通过调用 `start()` 方法将其在后台线程中运行，避免阻塞主线程。
-   **信号机制**：使用 PyQt 的 **`pyqtSignal`{lang="yaml"}** 机制，`Task` 类定义了三个信号：
    -   `success_signal`：当任务成功完成时发送信号。
    -   `fail_signal`：当任务执行过程中出现异常时发送信号。
    -   `finished_signal`：当任务完成（无论成功还是失败）时发送信号。

-   **回调函数连接**：`onSuccess`、`onFail` 和 `onFinished` 方法允许我们方便地将相应的回调函数连接到这些信号上。例如，我们可以在任务成功时更新 UI 元素，在任务失败时显示错误消息，在任务完成时执行清理操作等。
-   **任务生命周期管理**：
    -   `create_task` 方法允许我们创建新的任务，并将其添加到 `_tasks` 字典中。
    -   `run_task` 方法用于启动一个任务，并在任务完成时调用 `remove_task` 方法将其从 `_tasks` 中移除，确保任务列表的及时更新。
    -   `run_tasks` 方法可以同时运行多个任务。
    -   `remove_task` 方法确保任务完成后从任务列表中移除，避免内存泄漏和任务状态混乱。
    -   `is_idle` 和 `is_all_idle` 方法用于检查任务是否处于空闲状态。

### 使用示例

```python
def getDeviceInfo():
    # 一些耗时操作...
    return "模拟设备数据"

task = TaskManager.create_task(getDeviceInfo).onSuccess(lambda deviceInfo: print(deviceInfo)).onFail(lambda e: print(e)).onFinished(lambda: print("任务结束"))
TaskManager.run_task(task)
```
