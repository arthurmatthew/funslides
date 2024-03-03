export const atobUrl = (data: string) => {
    return atob(data.replace(/_/g, "/").replace(/-/g, "+"));
};

export const btoaUrl = (data: string) => {
    return btoa(data).replace(/\//g, "_").replace(/\+/g, "-");
};
