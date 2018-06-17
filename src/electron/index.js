require('ts-node').register();
const isModeSet =process.argv.some(arg => {
    if (arg.toUpperCase().includes('APPMODE=')) {
        require('./main').main(arg.substr(arg.search('=')+1));
        return true;
    }
    return false;
});
if (!isModeSet) {
    require('./main').main('FiLE_SYSTEM');
    return true;
}