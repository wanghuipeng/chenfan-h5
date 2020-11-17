const globalModules = {
    state: {
        isSdkReady: false,
        dictData: {
            areas: [],
            dicts: {},
            functions: [],
            industry: []
        }, // 字典
        userInfo: {}, // 用户信息
        textareaParams: {} // textarea页参数
    },
    getters: {
        isSdkReady: state => state.isSdkReady
    },
    mutations: {
        setSdkReady(state, payload) {
            state.isSdkReady = payload
        },
        setDictData(state, dictData) {
            state.dictData = dictData
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        setTextarea(state, textareaParams) {
            state.textareaParams = textareaParams
        }
    },
    actions: {
        kickedReset(context) {
            context.commit('resetGroup')
            context.commit('resetUser')
            context.commit('resetCurrentConversation')
            context.commit('resetAllConversation')
        },
        updateDictData(context, dict) {
            context.commit('setDictData', dict)
        },
        updateUserInfo(context, userInfo) {
            context.commit('setUserInfo', userInfo)
        },
        updateTextarea(context, textareaParams) {
            context.commit('setTextarea', textareaParams)
        }
    }
}

export default globalModules // eslint-disable-line