import { ref, computed} from 'vue'
export default function useEditTodo (todosRef) { 
    // console.log
    // const editingTodoRef = ref(todosRef.value[0]) // 测试第一个
    const editingTodoRef = ref(null) // 当前在修改哪一个TODO
    let originTitle = null

    const editTodo = (todo) => {
        originTitle = todo.title
        editingTodoRef.value = todo
    }
    
    // 完成修改
    const doneEdit = () => { 
        console.log('完成修改')
        editingTodoRef.value = null
    }

    const cancelEdit = (todo) => { 
        editingTodoRef.value = null
        todo.title = originTitle
    }

    // const setAllCompleted = (completed)=> { 
    //     todosRef.value.forEach(todo => {
    //         todo.completed = completed
    //     })
    // }
    const allDoneRef = computed({
        get () { 
            // 全部完成，也就是不完成的数量为0
            const res = todosRef.value.filter(it => !it.completed).length === 0
            console.log(res)
            return res
        },
        set (checked) { 
            todosRef.value.filter(it => { 
                it.completed = checked
            })
        }
    })
    return {
        editingTodoRef,
        editTodo,
        doneEdit,
        cancelEdit,
        allDoneRef
        // setAllCompleted,
    }
}