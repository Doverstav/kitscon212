export type WalkFunction = (params: WalkParams) => Path

export type WalkParams = { boardHeight: number, boardWidth: number, input: string }
export type Path = Step[]
export type Step = { x: number, y: number }