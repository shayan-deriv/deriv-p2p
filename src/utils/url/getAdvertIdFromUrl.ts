const getAdvertIdFromUrl = (url: string): string => {
    const urlParts = url.split('/');
    return urlParts[3];
};

export default getAdvertIdFromUrl;
