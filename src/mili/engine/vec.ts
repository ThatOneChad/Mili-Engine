import { Position } from './pos';
import { Clamp } from './utils/utils';
import { Immutable } from './utils/immutable';

export class Vec2
{
	public x: number;
	public y: number;

	constructor(x: number = 0, y: number = 0)
	{
		this.x = x;
		this.y = y;
	}

	public AsImut(): Vec2
	{
		return Immutable(this.Copy());
	}

	//////////////////////////////////////////////////////

	public Clear(): Vec2
	{
		this.x = this.y = 0;
		
		return this;
	}

	public Copy(): this
	{
		return new (this.constructor as ConstructorOf<this>)(this.x, this.y);
	}

	//////////////////////////////////////////////////////

	public Add(x: number | Position, y: number = 0): Vec2
	{
		if (typeof x !== 'number')
		{
			y = x.y;
			x = x.x;
		}

		return new Vec2(this.x + x, this.y + y);
	}

	public static Add(a: Position, b: Position): Vec2
	{
		return new Vec2(a.x + b.x, a.y + b.y);
	}

	public Mul(x: number | Position, y: number = 0): Vec2
	{
		if (typeof x !== 'number')
		{
			y = x.y;
			x = x.x;
		}

		return new Vec2(this.x * x, this.y * y);
	}

	public static Mul(a: Position, b: Position): Vec2
	{
		return new Vec2(a.x * b.x, a.y * b.y);
	}

	//////////////////////////////////////////////////////

	public ClampX(min: number, max: number): Vec2
	{
		this.x = Clamp(min, this.x, max);

		return this;
	}

	public ClampY(min: number, max: number): Vec2
	{
		this.y = Clamp(min, this.y, max);

		return this;
	}

	public Clamp(between: [Position, Position]): Vec2
	{
		const pos1: Position = between[0];
		const pos2: Position = between[1];

		return this
				.ClampX(pos1.x, pos2.x)
				.ClampY(pos1.y, pos2.y); 
	}

	//////////////////////////////////////////////////////

	public static get ZERO(): Vec2
	{
		return new Vec2();
	}
}