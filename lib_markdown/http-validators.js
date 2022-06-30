const fetch = (...args) => import('node-fetch')
    .then(({ default: fetch }) => fetch(...args));


function handylingException(err) {
    new Error(err.message);
}

async function getResponse(urls) {
    try {
        const httpStatus = await Promise
            .all(urls
                .map(async url => {
                    const response = await fetch(url)
                    return response.status;
                }
                )
            )

        return httpStatus
    }
    catch(err){
        handylingException(err)
    }
}

function genereteUrl(links) {
    return links
        .map(link => Object
            .values(link)
            .join());
}

async function validateUrls(links) {
    const urls = genereteUrl(links);
    const responseStatus = await getResponse(urls)
    const response = links
        .map((link, index) => ({
            ...link, status: responseStatus[index]
        })
        )

    return response
}

module.exports = validateUrls
