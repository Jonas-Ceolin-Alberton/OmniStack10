module.exports = (arrayString) => {
    return arrayString.split(',').map(tech => tech.trim());
}