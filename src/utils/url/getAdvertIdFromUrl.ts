const getAdvertIdFromUrl = (url: string): string => {
    const urlParts = url.split('/');
    return urlParts[5];
};

export default getAdvertIdFromUrl;
