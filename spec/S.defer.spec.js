describe('S.async', function () {
    it('can delay updates', function () {
        var go = null,
            d = S.data(1),
            f = S.defer(function (g) { go = g; }).S(function () { return d(); });

        expect(f()).toBe(1);
        d(2);
        expect(f()).toBe(1);
        go();
        expect(f()).toBe(2);
    });
    
    it('can return a "tick" function', function () {
        var go = null,
            ticks = 0,
            tick = function () { ticks++; },
            a = S.data(1),
            c = S.defer(function (g) { go = g; return tick; }).S(function () { return a(); });
            
        expect(c()).toBe(1);
        expect(go).not.toBe(null);
        expect(ticks).toBe(0);
        
        a(2);
        
        expect(c()).toBe(1);
        expect(ticks).toBe(1);
        
        a(3);
        
        expect(c()).toBe(1);
        expect(ticks).toBe(2);
        
        a(4);
        
        expect(c()).toBe(1);
        expect(ticks).toBe(3);
        
        go();
        
        expect(c()).toBe(4);
        expect(ticks).toBe(3);
        
        a(5);
        
        expect(c()).toBe(4);
        expect(ticks).toBe(4);
    });
});