const mixin = {
    data() {
        return {}
    },
    mounted() {},
    methods: {
        // 页面顶部返回按钮
        onClickLeft() {
            console.log('返回')
            if (window.history.length > 1) {
                this.$router.go(-1);
            } else {
                this.$router.replace('/home');
            }
        }
    }
}
export default mixin