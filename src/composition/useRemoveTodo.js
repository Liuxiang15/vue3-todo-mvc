export default function (todosRef) { 
    const remove = todo => { 
        // 删除一个
        todosRef.value.splice(todosRef.value.indexOf(todo), 1)
    }
    const removeCompleted = () => { 
        todosRef.value = todosRef.value.filter(it => !it.completed)
    }
    return {
        remove,
        removeCompleted
    }
}