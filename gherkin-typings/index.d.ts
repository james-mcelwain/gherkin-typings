declare module 'gherkin' {


    interface GherkinAstNode {
        ruleType: string
        
        add(ruleType: string): void
        getSingle(ruleType: string): GherkinToken
        getItems(ruleType: string): GherkinToken[] 
        getToken(tokenType: string): GherkinToken
        gettokens(tokenType: string): GherkinToken[]
    }

    interface GherkinDocument {
        type: 'GherkinDocument'
        feature: GherkinFeature
    }
    
    interface GherkinFeature {
        type: 'Feature',
        tags: GherkinTag[],
        location: Location,
        keyword: 'Feature'
        name: string
        children: any[]
    }

    interface GherkinToken {
        line: GherkinLine
        location: number
        isEoF: boolean

        detach(): void
        getTokenvalue(): string | GherkinLine
    }

    interface GherkinTag {
        type: 'Tag'
        location: Location
        name: string
    }

    interface GherkinScenario {
        type: 'Scenario'
        keyword: 'Scenario'
        tags: GherkinTag[]
        location: Location
        steps: GherkinStep[]
        descrption: string
        name: string
    }
    
    interface GherkinBackground {
        type: 'Background'
        keyword: 'Background'
        location: Location
        steps: GherkinStep[]
        descriptoin: string
        name: string
    }
    
    interface GherkinDataTable {
        type: 'DataTable'
        location: Location
        rows: GherkinTableRow[] 
    }
    
    interface GherkinTableRow {
        type: 'TableRow'
        location: Location
        cells: string[]
    }
    
    interface GherkinStep {
        type: 'Step'
        location: Location
        text: string
        keyword: 'Given' | 'When' | 'Then'
        argument: string[]
    }

    interface GherkinLine {
        lineText: string
        lineNumber: number
        trimmedLineText: string
        isEmpty: boolean
        indent: number

        startsWith(prefix: string): boolean

        startsWithTitleKeyword(keyword: string): boolean

        getRestTrimmed(length: number): string

        getTablecells(): string[]

        getTags(): { column: number, text: string }
    }

    export class Parser {
        constructor()
        constructor(builder: AstBuilder)


        parse(token: string)
        parse(tokenScanner: TokenScanner)
        parse(token: string, TokenMatcher: TokenMatcher)
        parse(tokenScanner: TokenScanner, TokenMatcher: TokenMatcher)

    }

    export class TokenScanner {
        constructor(source: string)

        read(): GherkinToken
    }

    export class TokenMatcher {
        constructor()
        constructor(dialect: string)

        reset(): void

        match_TagLine(token: GherkinToken): boolean
        match_FeatureLine(token: GherkinToken): boolean
        match_ScenarioLine(token: GherkinToken): boolean
        match_ScenarioOutlineLine(token: GherkinToken): boolean
        match_ScenarioOutlineLine(token: GherkinToken): boolean
        match_ScenarioOutlineLine(token: GherkinToken): boolean
        match_TableRow(token: GherkinToken): boolean
        match_Empty(token: GherkinToken): boolean
        match_Comment(token: GherkinToken): boolean
        match_Language(token: GherkinToken): boolean
        match_DocStringSeparator(token: GherkinToken): boolean
        match_EOF(token: GherkinToken): boolean
        match_StepLine(token: GherkinToken): boolean
        match_Other(string: GherkinToken): boolean
    }

    export class AstBuilder {
        reset()

        startRule(ruleType: string): void

        endRule(ruleTypE: string): void

        build(GherkinToken): void

        getResult(): GherkinDocument
    }

    export interface Pickle {
        tags: Tag[]
        name: string,
        location: Location[],
        steps: Step[]
    }
    
    type Step = {
        text: string,
        arguments: GherkinDataTable[],
        locations: Location[]
    }
    
    type Location = {
        path: string,
        line: number,
        column: number
    }
    
    type Tag = {
        name: string,
        location: Location
    }

    export class Compiler {
        compile(gherkinDocument: GherkinDocument, path: string): Pickle[]
    }
}