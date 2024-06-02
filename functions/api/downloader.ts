export async function onRequest(context) {
  const responseData = await readRequestBody(context.request);
  const responseHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Max-Age': '86400',
  };
  if (typeof responseData === 'string') {
    return new Response(responseData, {
      headers: responseHeaders,
    });
  } else if (typeof responseData === 'object') {
    // see: https://github.com/ajzbc/youtube-extractor
    const response = await fetch(responseData.url);
    const html = await response.text();
    const regex = html.match(`var ytInitialPlayerResponse = (.*);<\/script>`);
    const info = JSON.parse(regex[1]);
    return Response.json(
      info,
      {
        headers: responseHeaders,
      },
    );
  }
  return Response.json(
    {},
    {
      headers: responseHeaders,
    },
  );
}

async function readRequestBody(request) {
  const contentType = request.headers.get('content-type');
  if (contentType.includes('application/json')) {
    return await request.json();
  } else if (contentType.includes('application/text')) {
    return request.text();
  } else if (contentType.includes('text/html')) {
    return request.text();
  } else if (contentType.includes('form')) {
    const formData = await request.formData();
    const body = {};
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }
    return body;
  } else {
    // Perhaps some other type of data was submitted in the form
    // like an image, or some other binary data.
    return 'a file';
  }
}
