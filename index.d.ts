export interface IFile{
    spoiler: boolean;
    hash: string;
    filename: string;
    originalFilename: string;
    mymetype: string;
    extension: string;
    size: number;
    sizeString: string;
    phash?: string;
    duration?: number;
    durationString?:string
    thumbextension: string;
    geometry: {
        width: number;
        height: number;
        thumbwidth: number;
        thumbheight: number;
    }
    geometryString: string;
    hasThumb: boolean;
    /**
     * Whether the file is an "attachment" type, a file that is not an image, video or audio.
     */
    attachment:boolean;
}

export interface IBoardQuery{
    /**
     * 	A string to search by board name and tags, including prefix matches.
     */
    search?:string
    /**
     * `popularity` sorts by a compound of (ips, pph, sequence_value), `activity` sorts by lastPostTimestamp.
     */
    sort?:'popularity'|'activity'
    /**
     * ``desc`` or ``asc`` for descending or ascending sort order respectively.
     */
    direction?: 'desc'|'asc'
    /**
     * If ``true``, put local sites grouped before webring sites. Sort and direction for local and webring sites will be independent.
     */
    local_first?: 'false'|'true'
    /**
     * Sites to include by siteName, can be repeated to include multiple sites. Blank includes all sites.
     */
    sites?:string
    /**
     * Page number. 30 per page. Blank is first page. Page numbering starts at 1. Included in all responses is maxPage.
     */
    page?:string
}

export interface IOverboardQuery{
    /**
     * 	Whether to include boards that are publicly listed and by default appear on the overboard. If not ``true`` and the add_boards parameter is empty, this will be ignored and default to true (otherwise you are asking for an overboard view of no boards).
     */
    include_default?:'false'|'true'
    /**  Additional boards to fetch threads from. Can be repeated for multiple boards.*/
    add?:string
    /** Boards to remove from the default board list if include_detault is true. Can be repeated for multiple boards. */
    rem?:string
}

export interface INewPost {
    /**
     * Use null to create a new thread, or the thread number to create a reply
     */
    thread: number | null;
    name?: string;
    message: string;
    subject?: string;
    /**
     * Email, or special values such as 'sage'.
     */
    email?: string;
    /**
     * Password required to delete the post later.
     */
    postpassword?: string;
    /**
     * One or more files, multipart form data. Use fs.createReadStream(filepath).
     */
    file?: any;
    /**
     * Array of sha256 hash of files to be spoilered.
     */
    spoiler?: string[];
    /**
     * Whether to spoiler all files.
     */
    spoiler_all?: boolean;
    /**
     * Array of sha256 hash of files to have filenames stripped.. The sha256 hash will be used instead. Note: the server will still receive the original filenames before stripping.
     */
    strip_filename?: string[];
    /**
     * Name of custom flag to be used. If null, will use no flag unless the board also has geoip flags enabled, then it will use the geo flag.
     */
    customflag?: string | null;
    /**
     * @see http://fatchan.gitgud.site/jschan-docs/#captcha-block-bypass
     */
    captcha?: number[] | string;
}

export interface IPostAction{
    /** 
     * Array of postId's to action against.
    */
    checkedposts:number[]
    /**
     * Delete the selected posts.
     */
    delete?:boolean
    /**
     * Spoiler all files in the selected posts.
     */
    spoiler?:boolean
    /**
     * Unlink files from the selected posts. If there are other copies of the file in other posts, or the global settings do not immediately prune unlinked files, the file may remain on disk.
     */
    unlink_file?:boolean
    /**
     * Password for anonymous users, the same one used to create the posts.
     */
    postpassword:string
    /**
     * Report the selected posts to board staff.
     */
    report?:boolean
    /**
     * Report the selected posts to global staff.
     */
    global_report?:boolean
    /**
     * Reason for reporting, if report or global_report.
     */
    report_reason?:string
    /**
     * 
     */
    captcha:number[]|string
}
export interface IThread extends IPost {
    thread: null;
    replyposts: number;
    replyfiles: number;
    sticky: number;
    bumplocked: number;
    cyclic: number;
    bumped: string;
    replies: IPost[] | [];
}

export interface IBoard {
    _id: string;
    tags: string[];
    sequence_value: number;
    pph: number;
    ppd: number;
    ips: number;
    lastPostTimestamp: {
        text: string;
        color: string;
    };
    webring: boolean;
    settings: {
        name: string;
        description: string;
        sfw: boolean;
        unlistedLocal: boolean;
    };
}

interface IThreadOverboard extends IThread{
    previewbacklinks: [];
    omittedfiles: number;
    omittedposts: number;
}

export interface IOverboardIndex {
    threads:IThreadOverboard[] 
}
export interface IOverboardCatalog{
    threads:IPost[] 
}
export interface IBoardList{
    boards:IBoard[]
}

export interface ICountry{
    code:string
    name:string
    src:string|undefined
    custom:boolean|undefined
}

export interface IPost{
    date: string;
    name: string;
    country: ICountry | null;
    ip?:{
        raw:string
        cloak:string
    }
    edited?:{
        username:string
        date:string
    }
    board: string;
    tripcode: string | null;
    capcode: string | null;
    subject: string | null;
    message: string;
    messagehash: string;
    nomarkup: string;
    /**
     * Thread null means OP.
     */
    thread: number | null;
    email: string;
    spoiler: boolean;
    userId: string | null;
    files: IFile[] | [];
    quotes: {
        thread: number;
        postId: number;
    }[] | [];
    crossquotes: [];
    backlinks: {
        postId: number;
    }[] | [];
    postId: number;
}

export interface IFilter{
    flag?:ICountry
    name?:string
    subject?:string
    tripcode?:string
    message?:string
}
