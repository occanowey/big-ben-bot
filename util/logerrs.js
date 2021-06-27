module.exports = async (config, promise) => {
    try {
        return await promise;
    } catch (e) {
        if (config.main_config.debugmode) {
            console.log(e);
        }
    }
}