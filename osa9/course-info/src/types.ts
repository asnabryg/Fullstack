
export interface CoursePartBase {
    name: string,
    exerciseCount: number,
    type: string
}

export interface CourseDescriptonPart extends CoursePartBase {
    description: string
}

export interface CourseNormalPart extends CourseDescriptonPart {
    type: "normal",
}

export interface CourseSpecialPart extends CourseDescriptonPart {
    type: "special",
    requirements: string[]
}

export interface CourseProjectPart extends CoursePartBase {
    type: "groupProject",
    groupProjectCount: number
}

export interface CourseSubmission extends CourseDescriptonPart {
    type: "submission",
    exerciseSubmissionLink: string
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmission | CourseSpecialPart;