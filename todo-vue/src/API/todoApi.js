// API 레이어: 실제 서버 대신 흉내내는 fetch 함수 모음
// baseURL, timeout 같은 공통 설정을 이 파일 한 곳에서 관리한다

const DEFAULT_TIMEOUT = 3000 // 3초 안에 응답 없으면 타임아웃 처리

function withTimeout(promise, ms) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('요청 시간이 초과되었습니다. 다시 시도해주세요.'))
        }, ms)

        promise.then((result) => {
            clearTimeout(timer)
            resolve(result)
        }).catch((err) => {
            clearTimeout(timer)
            reject(err)
        })
    })
}

// todos: 원본 목록, filterValue: 'all' | 'active' | 'done'
// options.shouldFail: 서버 에러(500) 흉내, options.shouldTimeout: 타임아웃 흉내
export function fetchTodos(todos, filterValue, options = {}) {
    const { shouldFail = false, shouldTimeout = false } = options
    const delay = filterValue === 'active' ? 2000 : 300

    const rawPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error('목록을 불러오지 못했습니다. (서버 오류)'))
                return
            }
            const result =
                filterValue === 'active' ? todos.filter((t) => !t.done)
                    : filterValue === 'done' ? todos.filter((t) => t.done)
                        : todos.slice()
            resolve(result)
        }, delay)
    })

    // 타임아웃 테스트용: 아주 짧은 제한시간을 줘서 일부러 실패시킴
    const timeoutLimit = shouldTimeout ? 100 : DEFAULT_TIMEOUT
    return withTimeout(rawPromise, timeoutLimit)
}