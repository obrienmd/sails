var Rows = Backbone.Collection.extend({

	// specified by child
///////////////////////////////////////////////////
//	model: Row,
///////////////////////////////////////////////////

	url: null,
	
	// Flags for filtering, searching, and pagination
	hasMore: false,
	
	/**
	 * Instead of blindly consuming JSON response from fetch,
	 * look for the "data" key and absorb flags to signal whether
	 * there are more pages of data available
	 */
	parse: function(data) {
        if (!data) {
            return []; 
        }
		else if (!data.data) {
			Log.log("Data returned from server using old API.");
			this.hasMore = false;
			return data;
		}
		else {
			this.hasMore = data.hasMore;
			return data.data;
		}
    },
	

	/**
	 * Sort by dateCreated by default
	 */
	comparator: function(model) {
		return -model.get("dateCreated");
	}
})