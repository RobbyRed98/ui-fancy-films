const requestMethod = {
	GET : 'get',
	POST : 'post',
	PUT : 'put',
	PATCH : 'patch',
	HEAD : 'head',
	DELETE : 'delete'
}

/**
 * Class representing a HTTPError.
 * @extends Error
 */
class HTTPError extends Error {
	/**
	 * @param  {Response} response - Response of the failed HTTP request.
	 */
	constructor(response) {
		super(response.statusText);
		this.name = 'HTTPError';
		this.response = response;
	}
}

/**
 * Class representing a HTTP request handler which enables to perform HTTP requests. 
 */
class HTTPRequestHandler {
	
	/**
	 * Creates a instance of HTTPRequestHandler.
	 * 
	 * @param  {JSON} [credentialsInclude=false] - Specifies if credentials should be included in all requests.
	 * @param  {JSON} [modeCors=false] - Specifies if credentials should be included in all requests.
	 */
	constructor(credentialsInclude = false, modeCors = false) {
		this.credentialsInclude = credentialsInclude;
		this.modeCors = modeCors;
	}

	/**
	 * Performs a HTTP GET request.
	 * 
	 * @param  {URL} url - URL which the request calls.
	 * @param  {JSON} [headers={}] - Headers of request. It is not necessary to specify the content-type header if content-type is JSON.
	 * @param  {JSON} [specialOptions={}] - Options of request. Mode option is set automatically. 
	 */
	async get(url, headers = {}, specialOptions = {}) {
		return await this.request(url, headers, {}, specialOptions, requestMethod.GET);
	}
	
	/**
	 * Performs a HTTP POST request.
	 * 
	 * @param  {URL} url - URL which the request calls.
	 * @param  {JSON} [headers={}] - Headers of request. It is not necessary to specify the content-type header if content-type is JSON.
	 * @param  {JSON} [json={}] - Body of request.
	 * @param  {JSON} [specialOptions={}] - Options of request. Mode option is set automatically. 
	 */
	async post(url, headers = {}, json = {}, specialOptions = {}) {
		return await this.request(url, headers, json, specialOptions, requestMethod.POST);
	}

	/**
	 * Performs a HTTP PUT request.
	 * 
	 * @param  {URL} url - URL which the request calls.
	 * @param  {JSON} [headers={}] - Headers of request. It is not necessary to specify the content-type header if content-type is JSON.
	 * @param  {JSON} [json={}] - Body of request.
	 * @param  {JSON} [specialOptions={}] - Options of request. Mode option is set automatically. 
	 */
	async put(url, headers = {}, json = {}, specialOptions = {}) {
		return await this.request(url, headers, json, specialOptions, requestMethod.PUT);
	}

	/**
	 * Performs a HTTP PATCH request.
	 * 
	 * @param  {URL} url - URL which the request calls.
	 * @param  {JSON} [headers={}] - Headers of request. It is not necessary to specify the content-type header if content-type is JSON.
	 * @param  {JSON} [json={}] - Body of request.
	 * @param  {JSON} [specialOptions={}] - Options of request. Mode option is set automatically. 
	 */
	async patch(url, headers = {}, json = {}, specialOptions = {}) {
		return await this.request(url, headers, json, specialOptions, requestMethod.PATCH);
	}

	/**
	 * Performs a HTTP HEAD request.
	 * 
	 * @param  {URL} url - URL which the request calls.
	 * @param  {JSON} [headers={}] - Headers of request. It is not necessary to specify the content-type header if content-type is JSON.
	 * @param  {JSON} [specialOptions={}] - Options of request. Mode option is set automatically. 
	 */
	async head(url, headers = {}, specialOptions = {}) {
		return await this.request(url, headers, json = {}, specialOptions, requestMethod.HEAD);
	}
	
	/**
	 * Performs a HTTP DELETE request.
	 * 
	 * @param  {URL} url - URL which the request calls.
	 * @param  {JSON} [headers={}] - Headers of request. It is not necessary to specify the content-type header if content-type is JSON.
	 * @param  {JSON} [json={}] - Body of request.
	 * @param  {JSON} [specialOptions={}] - Options of request. Mode option is set automatically. 
	 */
	async delete(url, headers = {}, json = {}, specialOptions = {}) {
		return await this.request(url, headers, json, specialOptions, requestMethod.DELETE);
	}
	
	/**
	 * @param  {URL} url - URL which the request calls.
	 * @param  {JSON} headers - Headers of request. It is not necessary to specify the content-type header if content-type is JSON.
	 * @param  {JSON} json - Body of request.
	 * @param  {JSON} specialOptions - Options of request. Mode option is set automatically.
	 * @param  {JSON} method - Specifies the mode of the request.
	 */
	async request(url, headers, json, specialOptions, method) {

		headers = Object.assign(headers, {'content-type': 'application/json'});

		let options = {
			method: method,
			//body: JSON.stringify(json),
			headers : headers
		}

		if(this.credentialsInclude){
			Object.assign(options, {credentials : 'include'});
		}

		if(this.modeCors){
			Object.assign(options, {mode : 'cors'})
		}

		Object.assign(options, specialOptions)

		const response = await fetch(url, options);

		if(!response.ok){
			throw new HTTPError(response);
		}

		return response;
	}
}

export {
	HTTPError,
	HTTPRequestHandler
}