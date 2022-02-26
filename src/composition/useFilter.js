// 筛选
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { filter} from '../util/todoStorage'
const validHash = ['all', 'active', 'completed']
export default function useFilter (todosRef) { 
    const visibleRef = ref('all')// 筛选方式
    // hash->筛选方式->筛选列表
    // window.addEventListener('hashchange' )
    // 1.组件加载完成的生命周期函数
    const onHashChange = () => { 
        console.log('hash changes')
        // 读取#/之后的东西
        const hash = location.hash.replace(/#\/?/, "")
        console.log(hash)
        if (validHash.includes(hash)) {
            // 有效的
            visibleRef.value = hash
        } else {
            console.log('哈希无效')
            location.hash = ""
            visibleRef.value = 'all'
        }

    }
    onMounted(() => { 
        console.log('mounted')
        window.addEventListener('hashchange', onHashChange )
    })
    // 2.组件销毁过后的生命周期函数
    onUnmounted(() => { 
        console.log('unmounted')
        window.removeEventListener('hashchange',onHashChange)
    })

    const filteredTodosRef = computed(() => { 
        return filter(todosRef.value, visibleRef.value)
    })

    const remainingTodosRef = computed(() => { 
        return filter(todosRef.value, 'active').length
    })

    const completedRef = computed(() => { 
        return filter(todosRef.value, 'completed').length
    })
    // 计算属性
    // computed({
    //     get () { 

    //     },
    //     set () { 

    //     }
    // })

    return {
        visibleRef,
        filteredTodosRef,
        remainingTodosRef,
        completedRef
    }
}