// 所有新增任务的方法都写这里

import { ref } from 'vue'
import { generateId} from '../util/todoStorage'
export default function useNewTodo (todosRef) { 
    const newTodoRef = ref("")// 新任务的标题
    const addTodo = () => { 
        // 新增一个任务
        const value=  newTodoRef.value && newTodoRef.value.trim()
        if (!value) { 
            return
        }
        console.log('新增', newTodoRef.value)
        // 生成一个任务对象，将其加入到任务列表中
        const todo = {
            id:generateId(),
            title: value,
            completed: false, //任务是否完成
            
        }
        todosRef.value.push(todo)
        // 输入完为空
        newTodoRef.value=''
        console.log(todo)
    }
    
    return {
        newTodoRef,
        addTodo
    }
}