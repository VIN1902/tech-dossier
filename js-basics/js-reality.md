# What is JS?
- ECMAScript decides what functionalities/features this language called JS is supposed to have. (set of rules)
    - Global Constructor Functions (Array, Object, Functions), instance methods (map, filter), Event loop, promises, etc.
- Different runtime environments (node, bun, deno, chrome, edge, firefox) implement these said features differently for performance competition. (in low level c++)
    - But along with implementing ES features, who’s stopping them from adding more on top?
    - node adds process.env global object to pull in OS's environment variable using JS, fs module, http module.
    - browsers adds window global object to parse DOM, etc.