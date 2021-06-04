var expect = require('chai').expect;

describe('checkForShip', function() {
    var checkForShip = require('../game_logic/ship_methods').checkForShip;
    var player;

    before(function() {
        player = {
            ships: [
                {
                    locations: [[0, 0], [0, 1]]
                },
                {
                    locations: [[1, 0], [1, 1]]
                },
                {
                    locations: [[2, 0], [2, 1], [2, 2], [2, 3]]
                }
            ]
        };
    });

    it('should correctly report no ship at a given players coordinate', function() {      
        expect(checkForShip(player, [9, 9])).to.be.false;
    });
    
    it('should correctly report a ship located at the given coordinates', function() {       
        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
    });

    it('should handle ships located at more than one coordinate', function() {

        expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);;
        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);;
        expect(checkForShip(player, [9, 9])).to.be.false;
    });

    it('should handle checkins multiple ships', function() {

        
        expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);;
        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);;
        expect(checkForShip(player, [1, 0])).to.deep.equal(player.ships[1]);;
        expect(checkForShip(player, [1, 1])).to.deep.equal(player.ships[1]);;
        expect(checkForShip(player, [2, 3])).to.deep.equal(player.ships[2]);;
        expect(checkForShip(player, [9, 9])).to.be.false;
    });
});

describe('damageShip', function () {
    var damageShip = require('../game_logic/ship_methods').damageShip;

    it('should register damage on a given ship at a given location', function () {
        var ship = {
            locations: [[0, 0]],
            damage: []
        };
        
        damageShip(ship, [0, 0]);
    
        expect(ship.damage).to.not.be.empty;
        expect(ship.damage[0]).to.deep.equal([0, 0]);
    });
});

describe('fire', function () {
    var fire = require('../game_logic/ship_methods').fire;
    var player;

    beforeEach(function() {
        player = {
            ships: [
                {
                    locations: [[0, 0]],
                    damage: []
                }
            ]
        };
    });

    after(function() {
        console.log('entire test suite completed')
    });

    afterEach(function() {
        console.log('one unit test completed')
    });

    it('should record damage on the given players ship at a given coordinate', function () {
        fire(player, [0, 0])
        expect(player.ships[0].damage[0]).to.deep.equal([0, 0])
    });

    it('should NOT record damage if there is no ship at my coordinates', function () {
        fire(player, [9, 9])
        expect(player.ships[0].damage).to.be.empty;
    });
});