frappe.provide('erpnext.hub')


erpnext.hub.URL    = 'http://159.89.175.122'
/**
 * @description Hub Call API
 * Behold, the Hub Call API
 */
frappe.log         = frappe.Logger.get('erpnext.hub.call')
erpnext.hub.call   = (method, data, options) =>
{
    const DEFAULT  =
    {
        method: 'POST'
    }
    options        = { ...DEFAULT, ...options }

    const url      = `${erpnext.hub.URL}/api/method/${method}`
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
 */
erpnext.hub.search = (query, types, fields) =>
{
    return new Promise(resolve => 
        erpnext.hub.call('hub.search'
    
        )
    )
}