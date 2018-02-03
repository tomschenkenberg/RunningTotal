import Player from "../src/stores/Player.js";

test('Player Instantiated', () => {
    const p = new Player(100,'player');
    expect(p).toBeDefined();

    // verify that initial state is as expected
    expect(p.totalscore).toBe(0);
    expect(p.scorecount).toBe(0);
    expect(p.name).toBe('Player'); // Capital P
    expect(p.id).toBe(100);
    expect(p.bgcolor).toBeDefined();
 });

test('Player Scores', () => {
    const p = new Player(100,'Player');   

    // Add test scores
    p.addScore(15);
    p.addScore(20);
    p.addScore(-5);

    // Test expected state
    expect(p.totalscore).toBe(30);
    expect(p.scorecount).toBe(3);
});
