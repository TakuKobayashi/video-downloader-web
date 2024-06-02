export function onRequestGet(context) {
    return Response.json({...context, hello: 'world'})
}