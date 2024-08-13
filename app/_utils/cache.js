class SimpleCache {
    constructor() {
      this.cache = new Map();
    }

    has(key) {
        return this.cache.has(key);
        }
  
    get(key) {
      const item = this.cache.get(key);
      if (!item) return null;
  
      if (Date.now() > item.expiry) {
        this.cache.delete(key);
        return null;
      }
      return item.value;
    }
  
    set(key, value, ttl) {
      const expiry = Date.now() + ttl * 1000;
      this.cache.set(key, { value, expiry });
    }
  }
  
  const cacheForSearch = new SimpleCache();
  const cacheForMovie = new SimpleCache();

  export { cacheForSearch, cacheForMovie };