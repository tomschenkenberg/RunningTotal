import PlayerStore from "../src/stores/playerStore.js";

test('PlayerStore Instantiated', () => {
    const p = new PlayerStore();
    expect(p).toBeDefined();

    // verify that initial state is as expected
    expect(p.playerCount).toBe(0);
 });

 test('PlayerStore Add Player', () => {
    const p = new PlayerStore();

    // Add player to Map
    const id = p.addPlayer("TEST");
    // Test expected state
    expect(p.playerCount).toBe(1);
    expect(p.playerExists("TEST")).toBe(true);
    expect(p.playerExists("X")).toBe(false);    

    // Player object
    player=p.getPlayerByName("TEST");
    expect(id).toBe(player.id);
    expect(player.totalscore).toBe(0);
    
    // Delete player
    p.deletePlayer(id);
    expect(p.playerCount).toBe(0);
 });

