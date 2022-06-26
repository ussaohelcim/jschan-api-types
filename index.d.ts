export interface IReply {
    date: string;
    name: string;
    country: {} | null;
    board: string;
    tripcode: string | null;
    capcode: string | null;
    subject: string | null;
    message: string;
    messagehash: string;
    nomarkup: string;
    thread: number | null;
    email: string;
    spoiler: boolean;
    userId: string | null;
    files: {
        filename: string;
        spoiler: boolean;
        hash: string;
        originalFilename: string;
        mymetype: string;
        size: number;
        extension: string;
        phash: string;
        sizeString: string;
        thumbextension: string;
        geometry: {
            width: number;
            height: number;
            thumbwidth: number;
            thumbheight: number;
            geometryString: string;
            hasThumb: boolean;
        };
    }[] | [];
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
export interface IThread extends IReply {
    thread: null;
    replyposts: number;
    replyfiles: number;
    sticky: number;
    bumplocked: number;
    cyclic: number;
    bumped: string;
    replies: IReply[] | [];
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
     * One or more files, multipart form data.
     */
    file?: FormData;
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

export interface IOverboard {
    threads:IThreadOverboard[] 
}
