const hub   = { }
window.hub  = hub

hub.URL     = 'http://159.89.175.122'

/**
 * @description Hub Call API
 * Behold, the Hub Call API
 */
frappe.log = frappe.Logger.get('hub.call')
hub.call   = (method, data, options) =>
{
    const DEFAULT  =
    {
        method: 'POST'
    }
    options        = { ...DEFAULT, ...options }

    const url      = `${hub.URL}/api/method/${method}`
    return new Promise(resolve =>
    {
        fetch(url,
        {
             method: 'POST',
               body: JSON.stringify(frappe._.is_empty(data) ? { } : data),
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response =>
        {
            resolve(response.message)
        })
    })
}

/**
 * @description Hub Search API
 * Behold, the Hub Search API. Powerful like yo grandmama.
 * 
 * {
 *      "results":
 *      [
 *          {
 *              "doctype": "Hub Item",
 *              "docname": "TootiFrooti",
 *                "score": 1
 *          }
 *      ]
 * }
 */
hub.search = (query, types, fields, filters, limit = 10, pagination = 1) =>
{
    return hub.call('hub.search',
        { query: query, types: types, fields: fields, filters: filters, limit: limit,
            pagination: pagination }
    )
}

/**
 * @description Hub Socket API
 */
frappe.log  = frappe.Logger.get("hub.socket")
hub.Socket  = class
{
    constructor (url)
    {
        if ( !'io' in window )
            throw frappe.ImportError("socket.io not imported.")

            
        this.url       = url || hub.URL
        
        frappe.log.info(`Connecting to hub.socket with URL: ${this.url}`)

        this.socket    = io(url)
        this.connected = this.socket.connected

        this.socket.on("connect", frappe.log.info(`Connected to hub.socket with URL: ${this.url}`))
    }
}

// hub.socket = new hub.Socket()