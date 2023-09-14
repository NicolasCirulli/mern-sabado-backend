export const logger = (req, res, next) => {
    console.log( `Method:${req.method} url: ${ req.url } time: ${new Date()}` )
    next()
}