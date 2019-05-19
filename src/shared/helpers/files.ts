const FILE_NAME_LENGTH = -50;

const sanitizeString = (name: string): string => (
    encodeURI(name.substr(FILE_NAME_LENGTH).replace(/[\W]+/g,'-').replace(/^[-_]+|[-_]+$/g, ''))
)

export const getFileName = (name: string): string => {
    const split = name.split('.');
    const extension = sanitizeString(name.split('.').slice(-1)[0]).toLowerCase();
    const fileName = sanitizeString(split.slice(0, -1).join(''))
    return `${fileName}.${extension}`;
};
