var keys = require('../shared/whichKeys'),
	actions = require('../shared/actions');

module.exports = [
	{
		key: { which: keys.escape },
		action: actions.GameOptions
	},
	{
		key: { which: keys.a },
		action: actions.TurnLeft
	},
	{
		key: { which: keys.left_arrow },
		action: actions.TurnLeft
	},
	{
		key: { which: keys.d },
		action: actions.TurnRight
	},
	{
		key: { which: keys.right_arrow },
		action: actions.TurnRight
	},
	{
		key: { which: keys.w },
		action: actions.MoveForward
	},
	{
		key: { which: keys.up_arrow },
		action: actions.MoveForward
	},
	{
		key: { which: keys.s },
		action: actions.MoveBackwards
	},
	{
		key: { which: keys.down_arrow },
		action: actions.MoveBackwards
	},
	{
		key: { which: keys.q },
		action: actions.StrafeLeft
	},
	{
		key: { which: keys.e },
		action: actions.StrafeRight
	},
	{
		key: { which: keys.spacebar },
		action: actions.Jump
	},
	{
		key: { which: keys.caps_lock },
		action: actions.AutoMoveToggle
	},
	{
		key: { alt: true, which: keys.a },
		action: actions.LookLeft
	},
	{
		key: { alt: true, which: keys.d },
		action: actions.LookRight
	},
	{
		key: { alt: true, which: keys.w },
		action: actions.LookUp
	},
	{
		key: { alt: true, which: keys.s },
		action: actions.LookDown
	},
	{
		key: { which: keys.equal_sign },
		action: actions.ZoomIn
	},
	{
		key: { which: keys.dash },
		action: actions.ZoomOut
	},
	{
		key: { which: keys.f },
		action: actions.Interact
	},
	{
		key: { which: keys["x"] },
		action: actions.WeaponEquippedToggle
	},
	{
		key: { which: keys.tab },
		action: actions.TargetNearestHostile
	},
	{
		key: { which: keys["t"] },
		action: actions.TargetNearestFriendly
	},
	{
		key: { which: keys["1"] },
		action: actions.UseAction1
	},
	{
		key: { which: keys["2"] },
		action: actions.UseAction2
	},
	{
		key: { which: keys["3"] },
		action: actions.UseAction3
	},
	{
		key: { which: keys["4"] },
		action: actions.UseAction4
	},
	{
		key: { which: keys["5"] },
		action: actions.UseAction5
	},
	{
		key: { which: keys["6"] },
		action: actions.UseAction6
	},
	{
		key: { which: keys["7"] },
		action: actions.UseAction7
	},
	{
		key: { which: keys["8"] },
		action: actions.UseAction8
	},

	

	
];