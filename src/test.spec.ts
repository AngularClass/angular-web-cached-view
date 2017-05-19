import { WebCacheLocation, getPath, createOriginUrl, getLocation } from './'
import { LocationStrategy } from '@angular/common'
import { expect } from 'chai'
import * as sinon from 'sinon'
describe('WebCacheLocation', () => {
  global['location'] = {
    pathname: '',
    search: ''
  }
  const mockPlatformStrategy = {
    getBaseHref: ():string => {
      return ''
    },
    onPopState: () => {},
    back: () => {},
    forward: () => {},
    prepareExternalUrl: (internal: string): string => {
      return ''
    },
    path: (includeHash?: any): string => {
      return ''
    },
    pushState: () => {

    },
    replaceState: ()=>{

    }
  }
  let testcache:WebCacheLocation
  beforeEach(()=> {
    testcache = new WebCacheLocation(mockPlatformStrategy as LocationStrategy)
  })
  describe('Normalize', ()=> {
    it('should return empty string when provided with empty ending url path', () => {
      const testUrl = 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.com/'
      const normalizedUrl = testcache.normalize(testUrl)
      expect(normalizedUrl).to.be.equal('')
    })
    it('should return string value after ending url slash', () => {
      const testUrl = 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.com'
      const normalizedUrl = testcache.normalize(testUrl)
      expect(normalizedUrl).to.be.equal('//www.angularclass.com')
    })
    it('should return string value equal to supplied ending url path of .com', () => {
      const testUrl = 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.com/courses'
      const normalizedUrl = testcache.normalize(testUrl)
      expect(normalizedUrl).to.be.equal('/courses')
    })
    it('should return string value equal to supplied ending url path of .io', () => {
      const testUrl = 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.io/courses'
      const normalizedUrl = testcache.normalize(testUrl)
      expect(normalizedUrl).to.be.equal('/courses')
    })
    it('should return string value equal to supplied ending url path of .gg', () => {
      const testUrl = 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.gg/courses'
      const normalizedUrl = testcache.normalize(testUrl)
      expect(normalizedUrl).to.be.equal('/courses')
    })
    it('should return string value equal to supplied ending url path of .net', () => {
      const testUrl = 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.net/courses'
      const normalizedUrl = testcache.normalize(testUrl)
      expect(normalizedUrl).to.be.equal('/courses')
    })
    it('should return string value equal to supplied ending url path of .gov', () => {
      const testUrl = 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.gov/courses'
      const normalizedUrl = testcache.normalize(testUrl)
      expect(normalizedUrl).to.be.equal('/courses')
    })
    it('should return string value equal to supplied ending url path of .tv', () => {
      const testUrl = 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.tv/courses'
      const normalizedUrl = testcache.normalize(testUrl)
      expect(normalizedUrl).to.be.equal('/courses')
    })
    it('should return string value equal to supplied ending url path of appended url site ', () => {
      const testUrl = 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.blog.angularclass.gov/courses'
      const normalizedUrl = testcache.normalize(testUrl)
      expect(normalizedUrl).to.be.equal('/courses')
    })
    it('should return string value equal to supplied ending url path of query', () => {
      const testUrl = 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.blog.angularclass.com/search?aB32*#sj'
      const normalizedUrl = testcache.normalize(testUrl)
      expect(normalizedUrl).to.be.equal('/search?aB32*#sj')
    })
  })
  describe('Go', ()=> {
    it('should update location pathname with input path', () => {
      global['location'] = {
        pathname: 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.com/',
        search: ''
      }

      const testPath = 'courses'
      const pushStateStub = sinon.stub(mockPlatformStrategy, 'pushState')
        .callsFake((...args) => {});

      testcache.go(testPath)
      sinon.assert.calledWith(pushStateStub, null, '', `http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.com/${testPath}`, '')
      pushStateStub.restore()
    })

    it('should update location pathname with input path special characters', () => {
      global['location'] = {
        pathname: 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.com/',
        search: ''
      }

      const testPath = 'courses/test123'
      const pushStateStub = sinon.stub(mockPlatformStrategy, 'pushState')
        .callsFake((...args) => {});

      testcache.go(testPath)
      sinon.assert.calledWith(pushStateStub, null, '', `http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.com/${testPath}`, '')
      pushStateStub.restore()
    })

  })

  describe('ReplaceState', ()=> {
    it('should update location pathname with input path', () => {
      global['location'] = {
        pathname: 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.com/',
        search: ''
      }

      const testPath = 'courses'
      const replaceStateStub = sinon.stub(mockPlatformStrategy, 'replaceState')
        .callsFake((...args) => {});

      testcache.replaceState(testPath)
      sinon.assert.calledWith(replaceStateStub, null, '', `http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.com/${testPath}`, '')
      replaceStateStub.restore()
    })

    it('should update location pathname with input path special characters', () => {
      global['location'] = {
        pathname: 'http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.com/',
        search: ''
      }

      const testPath = 'courses/test123'
      const replaceStateStub = sinon.stub(mockPlatformStrategy, 'replaceState')
        .callsFake((...args) => {});

      testcache.replaceState(testPath)
      sinon.assert.calledWith(replaceStateStub, null, '', `http://webcache.googleusercontent.local:3000/search?q=cache:https://www.angularclass.com/${testPath}`, '')
      replaceStateStub.restore()
    })
  })
})