import { 
	ActivatedRouteSnapshot,
	RouteReuseStrategy,
	DetachedRouteHandle
} from '@angular/router';


interface RouteStorageObject {
	snapshot: ActivatedRouteSnapshot;
	handle: DetachedRouteHandle;
}


export class GameRouteReuseStrategy implements RouteReuseStrategy {

	/** 
	* Object which will store RouteStorageObjects indexed by keys
	* The keys will all be a path (as in route.routeConfig.path)
	* This allows us to see if we've got a route stored for the requested path
	*/
	private storedRoutes: { [key: string]: RouteStorageObject } = {};
	private acceptedRoutes: string[] = [
		'scene'
	];

	/** 
	* Нужно ли взять route и положить в storedRoutes
	* @param route This is, at least as I understand it, the route that the user is currently on, and we would like to know if we want to store it
	* @returns boolean indicating that we want to (true) or do not want to (false) store that route
	*/
	shouldDetach(route: ActivatedRouteSnapshot): boolean {
	    // check to see if the route path is in our acceptedRoutes array
	    if (this.acceptedRoutes.includes(route.routeConfig.path)) {
	        return true;
	    } else {
	        return false;
	    }
	}

	/**
	* Constructs object of type `RouteStorageObject` to store, and then stores it for later attachment
	* @param route This is stored for later comparison to requested routes, see `this.shouldAttach`
	* @param handle Later to be retrieved by this.retrieve, and offered up to whatever controller is using this class
	*/
	store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
		let storedRoute: RouteStorageObject = {
			snapshot: route,
			handle: handle
		};

		//console.log( "store:", storedRoute, "into: ", this.storedRoutes );
		// routes are stored by path - the key is the path name, and the handle is stored under it so that you can only ever have one object stored for a single path
		this.storedRoutes[route.routeConfig.path] = storedRoute;
	}


	/**
	* Определяет есть ли запрошенный роут в storedRoutes, если есть использовать ли его вместо запрошенного роута
	* @param route The route the user requested
	* @returns boolean indicating whether or not to render the stored route
	*/
	shouldAttach(route: ActivatedRouteSnapshot): boolean {
		let canAttach: boolean = !!route.routeConfig && !!this.storedRoutes[route.routeConfig.path];
		// this decides whether the route already stored should be rendered in place of the requested route, and is the return value
		// at this point we already know that the paths match because the storedResults key is the route.routeConfig.path
		// so, if the route.params and route.queryParams also match, then we should reuse the component
		if (canAttach) {
			let willAttach: boolean = true;	
			//let willAttach: boolean = false;	
			let paramsMatch: boolean = this.compareObjects(route.params, this.storedRoutes[route.routeConfig.path].snapshot.params);
			let queryParamsMatch: boolean = this.compareObjects(route.queryParams, this.storedRoutes[route.routeConfig.path].snapshot.queryParams);

			return willAttach && paramsMatch && queryParamsMatch;
		} else {
			return false;
		}
	}


	/** 
	* Finds the locally stored instance of the requested route, if it exists, and returns it
	* @param route New route the user has requested
	* @returns DetachedRouteHandle object which can be used to render the component
	*/
	retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {

		// return null if the path does not have a routerConfig OR if there is no stored route for that routerConfig
		if (!route.routeConfig || !this.storedRoutes[route.routeConfig.path]) return null;
		//console.log("retrieving", "return: ", this.storedRoutes[route.routeConfig.path]);
		/** returns handle when the route.routeConfig.path is already stored */
		return this.storedRoutes[route.routeConfig.path].handle;
	}

	/** 
	* Determines whether or not the current route should be reused
	* @param future The route the user is going to, as triggered by the router
	* @param curr The route the user is currently on
	* @returns boolean basically indicating true if the user intends to leave the current route
	*/
	shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
		// console.log("deciding to reuse", "future", future.url.join('/'), "current", curr.url.join('/'), "return: ", future.routeConfig === curr.routeConfig);

		return future.routeConfig === curr.routeConfig;
	}

	/** 
	* This nasty bugger finds out whether the objects are _traditionally_ equal to each other, like you might assume someone else would have put this function in vanilla JS already
	* One thing to note is that it uses coercive comparison (==) on properties which both objects have, not strict comparison (===)
	* Another important note is that the method only tells you if `compare` has all equal parameters to `base`, not the other way around
	* @param base The base object which you would like to compare another object to
	* @param compare The object to compare to base
	* @returns boolean indicating whether or not the objects have all the same properties and those properties are ==
	*/
	private compareObjects(base: any, compare: any): boolean {

        // loop through all properties in base object
        for (let baseProperty in base) {

            // determine if comparrison object has that property, if not: return false
            if (compare.hasOwnProperty(baseProperty)) {
                switch(typeof base[baseProperty]) {
                    // if one is object and other is not: return false
                    // if they are both objects, recursively call this comparison function
                    case 'object':
                        if ( typeof compare[baseProperty] !== 'object' || !this.compareObjects(base[baseProperty], compare[baseProperty]) ) { return false; } break;
                    // if one is function and other is not: return false
                    // if both are functions, compare function.toString() results
                    case 'function':
                        if ( typeof compare[baseProperty] !== 'function' || base[baseProperty].toString() !== compare[baseProperty].toString() ) { return false; } break;
                    // otherwise, see if they are equal using coercive comparison
                    default:
                        if ( base[baseProperty] != compare[baseProperty] ) { return false; }
                }
            } else {
                return false;
            }
        }

        // returns true only after false HAS NOT BEEN returned through all loops
        return true;
    }

}
