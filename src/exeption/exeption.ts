export const showCorrectDate = (date: string) => {
    const newDate = date.split('T');
    const day = newDate[0].split('-').reverse().join('-');
    const time = newDate[1].slice(0, 8);
    return {day, time};
}