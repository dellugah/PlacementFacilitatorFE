// Technical Skill enum
export enum TechnicalSkill {
  // Programming Languages
  JAVA = 'JAVA',
  PYTHON = 'PYTHON',
  JAVASCRIPT = 'JAVASCRIPT',
  TYPESCRIPT = 'TYPESCRIPT',
  CSHARP = 'CSHARP',
  CPP = 'CPP',
  RUBY = 'RUBY',
  PHP = 'PHP',
  SWIFT = 'SWIFT',
  KOTLIN = 'KOTLIN',
  GO = 'GO',
  RUST = 'RUST',

  // Web Frontend
  HTML = 'HTML',
  CSS = 'CSS',
  REACT = 'REACT',
  ANGULAR = 'ANGULAR',
  VUE = 'VUE',
  JQUERY = 'JQUERY',
  BOOTSTRAP = 'BOOTSTRAP',
  SASS = 'SASS',
  WEBPACK = 'WEBPACK',
  REDUX = 'REDUX',
  NEXTJS = 'NEXTJS',

  // Backend
  SPRING = 'SPRING',
  NODEJS = 'NODEJS',
  DJANGO = 'DJANGO',
  FLASK = 'FLASK',
  EXPRESS = 'EXPRESS',
  ASPNET = 'ASPNET',
  LARAVEL = 'LARAVEL',
  HIBERNATE = 'HIBERNATE',
  JPA = 'JPA',

  // ... (all other enum values remain the same)
}

// Account Type enum
export enum AccountType {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  EMPLOYER = 'EMPLOYER'
}

export class ProfileDTO {
  constructor(
    public profileId?: number,
    public bio?: string,
    public email?: string,
    public linkOne?: string,
    public linkTwo?: string,
    public skills: TechnicalSkill[] = [],
    public domestic?: boolean,
    public profilePhoto?: string,
    public placements?: PlacementDTO[],
    public companyName?: string,
    public firstName?: string,
    public lastName?: string,
    public visible: boolean = false,
    public file?: string
  ) {}
}

export class PlacementDTO {
  constructor(
    public placementId?: number,
    public positionName: string = '',
    public positionDescription?: string,
    public requiredSkills: TechnicalSkill[] = [],
    public positionsAvailable: number = 0,
    public visible: boolean = false,
    public potentialCandidates: ProfileDTO[] = []
  ) {}
}

export class AccountDTO {
  constructor(
    public accountId?: number,
    public username: string = '',
    public password: string = '',
    public accountType: AccountType = AccountType.STUDENT,
    public profile?: ProfileDTO
  ) {}
}
