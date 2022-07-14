const domain = "http://localhost:8080"

export const parse = (query) => {
    // filePath = encodeURI(filePath);
    const parseUrl = new URL(`${domain}/parse`);
    parseUrl.searchParams.append("file_path", encodeURI(query.file_path));

    return fetch(parseUrl, {
        method: "GET",
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to parse the file directory");
        }
        return response.json();
    })
}

export const getHistory = (filePath, repoPath) => {
    const getHistoryUrl = new URL(`${domain}/history`);
    getHistoryUrl.searchParams.append("file_path", filePath);
    getHistoryUrl.searchParams.append("repo_path", repoPath);

    return fetch(getHistoryUrl, {
        headers: {
            method: "GET",
        }
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to get history");
        }

        return response.json();
    })
}