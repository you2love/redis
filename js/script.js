// 导航菜单高亮
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath === href || (currentPath === '/' && href === '/index.html')) {
            link.classList.add('active');
        }
    });
});

// 命令参考页面功能
if (document.getElementById('commandsPage')) {
    const commands = [
        // 字符串命令
        { name: 'SET', category: '字符串', description: '设置键的值', syntax: 'SET key value [EX seconds] [PX milliseconds] [NX|XX]', example: 'SET mykey "Hello World"' },
        { name: 'GET', category: '字符串', description: '获取键的值', syntax: 'GET key', example: 'GET mykey' },
        { name: 'INCR', category: '字符串', description: '将键的值加1', syntax: 'INCR key', example: 'INCR counter' },
        { name: 'DECR', category: '字符串', description: '将键的值减1', syntax: 'DECR key', example: 'DECR counter' },
        { name: 'INCRBY', category: '字符串', description: '将键的值增加指定数量', syntax: 'INCRBY key increment', example: 'INCRBY counter 5' },
        { name: 'DECRBY', category: '字符串', description: '将键的值减少指定数量', syntax: 'DECRBY key decrement', example: 'DECRBY counter 3' },
        { name: 'MGET', category: '字符串', description: '获取多个键的值', syntax: 'MGET key1 key2 ...', example: 'MGET key1 key2 key3' },
        { name: 'MSET', category: '字符串', description: '设置多个键的值', syntax: 'MSET key1 value1 key2 value2 ...', example: 'MSET key1 "value1" key2 "value2"' },

        // 哈希命令
        { name: 'HSET', category: '哈希', description: '设置哈希表中的字段值', syntax: 'HSET key field value', example: 'HSET user:1 name "John"' },
        { name: 'HGET', category: '哈希', description: '获取哈希表中指定字段的值', syntax: 'HGET key field', example: 'HGET user:1 name' },
        { name: 'HGETALL', category: '哈希', description: '获取哈希表中所有字段和值', syntax: 'HGETALL key', example: 'HGETALL user:1' },
        { name: 'HDEL', category: '哈希', description: '删除哈希表中的字段', syntax: 'HDEL key field', example: 'HDEL user:1 name' },
        { name: 'HEXISTS', category: '哈希', description: '检查哈希表中是否存在指定字段', syntax: 'HEXISTS key field', example: 'HEXISTS user:1 name' },
        { name: 'HKEYS', category: '哈希', description: '获取哈希表中所有字段名', syntax: 'HKEYS key', example: 'HKEYS user:1' },
        { name: 'HVALS', category: '哈希', description: '获取哈希表中所有值', syntax: 'HVALS key', example: 'HVALS user:1' },
        { name: 'HINCRBY', category: '哈希', description: '为哈希表中的字段值增加指定数量', syntax: 'HINCRBY key field increment', example: 'HINCRBY user:1 score 10' },

        // 列表命令
        { name: 'LPUSH', category: '列表', description: '将值插入列表头部', syntax: 'LPUSH key value1 value2 ...', example: 'LPUSH mylist "first"' },
        { name: 'RPUSH', category: '列表', description: '将值插入列表尾部', syntax: 'RPUSH key value1 value2 ...', example: 'RPUSH mylist "last"' },
        { name: 'LPOP', category: '列表', description: '移除并返回列表头部的元素', syntax: 'LPOP key', example: 'LPOP mylist' },
        { name: 'RPOP', category: '列表', description: '移除并返回列表尾部的元素', syntax: 'RPOP key', example: 'RPOP mylist' },
        { name: 'LRANGE', category: '列表', description: '获取列表中指定范围的元素', syntax: 'LRANGE key start stop', example: 'LRANGE mylist 0 -1' },
        { name: 'LLEN', category: '列表', description: '获取列表长度', syntax: 'LLEN key', example: 'LLEN mylist' },
        { name: 'LINDEX', category: '列表', description: '获取列表中指定索引的元素', syntax: 'LINDEX key index', example: 'LINDEX mylist 0' },
        { name: 'LSET', category: '列表', description: '设置列表中指定索引的值', syntax: 'LSET key index value', example: 'LSET mylist 0 "newvalue"' },

        // 集合命令
        { name: 'SADD', category: '集合', description: '向集合添加一个或多个成员', syntax: 'SADD key member1 member2 ...', example: 'SADD myset "member1"' },
        { name: 'SREM', category: '集合', description: '移除集合中的一个或多个成员', syntax: 'SREM key member1 member2 ...', example: 'SREM myset "member1"' },
        { name: 'SMEMBERS', category: '集合', description: '返回集合中的所有成员', syntax: 'SMEMBERS key', example: 'SMEMBERS myset' },
        { name: 'SISMEMBER', category: '集合', description: '判断成员是否在集合中', syntax: 'SISMEMBER key member', example: 'SISMEMBER myset "member1"' },
        { name: 'SCARD', category: '集合', description: '获取集合的成员数', syntax: 'SCARD key', example: 'SCARD myset' },
        { name: 'SINTER', category: '集合', description: '返回给定集合的交集', syntax: 'SINTER key1 key2 ...', example: 'SINTER set1 set2' },
        { name: 'SUNION', category: '集合', description: '返回给定集合的并集', syntax: 'SUNION key1 key2 ...', example: 'SUNION set1 set2' },
        { name: 'SDIFF', category: '集合', description: '返回给定集合的差集', syntax: 'SDIFF key1 key2 ...', example: 'SDIFF set1 set2' },

        // 有序集合命令
        { name: 'ZADD', category: '有序集合', description: '向有序集合添加一个或多个成员', syntax: 'ZADD key score member [score member ...]', example: 'ZADD myzset 1 "member1"' },
        { name: 'ZREM', category: '有序集合', description: '移除有序集合中的一个或多个成员', syntax: 'ZREM key member1 member2 ...', example: 'ZREM myzset "member1"' },
        { name: 'ZRANGE', category: '有序集合', description: '通过索引区间返回有序集合成员', syntax: 'ZRANGE key start stop [WITHSCORES]', example: 'ZRANGE myzset 0 -1 WITHSCORES' },
        { name: 'ZRANK', category: '有序集合', description: '返回有序集合中指定成员的排名', syntax: 'ZRANK key member', example: 'ZRANK myzset "member1"' },
        { name: 'ZSCORE', category: '有序集合', description: '返回有序集合中指定成员的分数', syntax: 'ZSCORE key member', example: 'ZSCORE myzset "member1"' },
        { name: 'ZCARD', category: '有序集合', description: '获取有序集合的成员数', syntax: 'ZCARD key', example: 'ZCARD myzset' },
        { name: 'ZCOUNT', category: '有序集合', description: '计算在有序集合中指定区间分数的成员数', syntax: 'ZCOUNT key min max', example: 'ZCOUNT myzset 0 10' },
        { name: 'ZINCRBY', category: '有序集合', description: '有序集合中对指定成员的分数加上增量', syntax: 'ZINCRBY key increment member', example: 'ZINCRBY myzset 5 "member1"' },

        // JSON 命令
        { name: 'JSON.SET', category: 'JSON', description: '设置 JSON 文档的值', syntax: 'JSON.SET key path value', example: 'JSON.SET user:1 $ \'{"name":"John","age":30}\'' },
        { name: 'JSON.GET', category: 'JSON', description: '获取 JSON 文档的值', syntax: 'JSON.GET key [path ...]', example: 'JSON.GET user:1 $.name' },
        { name: 'JSON.DEL', category: 'JSON', description: '删除 JSON 文档中的值', syntax: 'JSON.DEL key [path]', example: 'JSON.DEL user:1 $.age' },
        { name: 'JSON.MGET', category: 'JSON', description: '从多个键获取 JSON 值', syntax: 'JSON.MGET path key1 key2 ...', example: 'JSON.MGET $.name user:1 user:2' },
        { name: 'JSON.MSET', category: 'JSON', description: '设置多个 JSON 文档的值', syntax: 'JSON.MSET key1 path1 value1 key2 path2 value2 ...', example: 'JSON.MSET user:1 $.name "Alice" user:2 $.name "Bob"' },
        { name: 'JSON.TYPE', category: 'JSON', description: '获取 JSON 值的类型', syntax: 'JSON.TYPE key [path]', example: 'JSON.TYPE user:1 $.age' },
        { name: 'JSON.STRLEN', category: 'JSON', description: '获取 JSON 字符串的长度', syntax: 'JSON.STRLEN key [path]', example: 'JSON.STRLEN user:1 $.name' },
        { name: 'JSON.OBJLEN', category: 'JSON', description: '获取 JSON 对象的键数量', syntax: 'JSON.OBJLEN key [path]', example: 'JSON.OBJLEN user:1 $' },
        { name: 'JSON.ARRLEN', category: 'JSON', description: '获取 JSON 数组的长度', syntax: 'JSON.ARRLEN key [path]', example: 'JSON.ARRLEN items $.products' },
        { name: 'JSON.ARRINDEX', category: 'JSON', description: '在 JSON 数组中查找元素的索引', syntax: 'JSON.ARRINDEX key path value', example: 'JSON.ARRINDEX items $.products "apple"' },
        { name: 'JSON.NUMINCRBY', category: 'JSON', description: '将 JSON 数字增加指定值', syntax: 'JSON.NUMINCRBY key path value', example: 'JSON.NUMINCRBY user:1 $.age 1' },
        { name: 'JSON.TOGGLE', category: 'JSON', description: '切换 JSON 布尔值', syntax: 'JSON.TOGGLE key [path]', example: 'JSON.TOGGLE user:1 $.active' },
        { name: 'JSON.ARRAPPEND', category: 'JSON', description: '向 JSON 数组追加值', syntax: 'JSON.ARRAPPEND key path value [value ...]', example: 'JSON.ARRAPPEND items $.products "orange"' },
        { name: 'JSON.ARRINSERT', category: 'JSON', description: '向 JSON 数组插入值', syntax: 'JSON.ARRINSERT key path index value [value ...]', example: 'JSON.ARRINSERT items $.products 0 "grape"' },
        { name: 'JSON.ARRPOP', category: 'JSON', description: '从 JSON 数组弹出值', syntax: 'JSON.ARRPOP key [path [index]]', example: 'JSON.ARRPOP items $.products' },
        { name: 'JSON.STRAPPEND', category: 'JSON', description: '向 JSON 字符串追加值', syntax: 'JSON.STRAPPEND key path value', example: 'JSON.STRAPPEND user:1 $.name " Smith"' },
        { name: 'JSON.CLEAR', category: 'JSON', description: '清空 JSON 值（数组/对象）', syntax: 'JSON.CLEAR key [path]', example: 'JSON.CLEAR items $.products' },
        { name: 'JSON.OBJKEYS', category: 'JSON', description: '获取 JSON 对象的所有键', syntax: 'JSON.OBJKEYS key [path]', example: 'JSON.OBJKEYS user:1 $' },

        // 通用命令
        { name: 'KEYS', category: '通用', description: '查找所有符合给定模式的键', syntax: 'KEYS pattern', example: 'KEYS user:*' },
        { name: 'DEL', category: '通用', description: '删除一个或多个键', syntax: 'DEL key1 key2 ...', example: 'DEL mykey' },
        { name: 'EXISTS', category: '通用', description: '检查键是否存在', syntax: 'EXISTS key', example: 'EXISTS mykey' },
        { name: 'TYPE', category: '通用', description: '返回键所存储的值的数据类型', syntax: 'TYPE key', example: 'TYPE mykey' },
        { name: 'TTL', category: '通用', description: '返回键的剩余生存时间（秒）', syntax: 'TTL key', example: 'TTL mykey' },
        { name: 'EXPIRE', category: '通用', description: '为键设置生存时间（秒）', syntax: 'EXPIRE key seconds', example: 'EXPIRE mykey 3600' },
        { name: 'RENAME', category: '通用', description: '重命名键', syntax: 'RENAME oldkey newkey', example: 'RENAME oldname newname' },
        { name: 'FLUSHDB', category: '通用', description: '清空当前数据库的所有键', syntax: 'FLUSHDB', example: 'FLUSHDB' }
    ];

    const categories = ['all', '字符串', '哈希', '列表', '集合', '有序集合', 'JSON', '通用'];
    let currentCategory = 'all';
    let searchQuery = '';

    // 渲染类别按钮
    const categoryFilter = document.getElementById('categoryFilter');
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn' + (cat === currentCategory ? ' active' : '');
        btn.textContent = cat === 'all' ? '所有类别' : cat;
        btn.onclick = () => filterCommands(cat);
        categoryFilter.appendChild(btn);
    });

    // 渲染命令卡片
    function renderCommands() {
        const commandsGrid = document.getElementById('commandsGrid');
        commandsGrid.innerHTML = '';

        const filteredCommands = commands.filter(cmd => {
            const matchCategory = currentCategory === 'all' || cmd.category === currentCategory;
            const matchSearch = cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               cmd.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchSearch;
        });

        if (filteredCommands.length === 0) {
            commandsGrid.innerHTML = '<p class="text-center text-muted">没有找到匹配的命令</p>';
            return;
        }

        filteredCommands.forEach(cmd => {
            const card = document.createElement('div');
            card.className = 'command-card fade-in';
            card.innerHTML = `
                <div class="command-header">
                    <span class="command-name">${cmd.name}</span>
                    <span class="command-category">${cmd.category}</span>
                </div>
                <p class="command-description">${cmd.description}</p>
                <div class="command-syntax"><strong>语法：</strong>${cmd.syntax}</div>
                <div class="command-example"><strong>示例：</strong>${cmd.example}</div>
            `;
            commandsGrid.appendChild(card);
        });
    }

    function filterCommands(category) {
        currentCategory = category;
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === (category === 'all' ? '所有类别' : category)) {
                btn.classList.add('active');
            }
        });
        renderCommands();
    }

    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCommands();
    });

    renderCommands();
}

// 交互式演示页面功能
if (document.getElementById('playgroundPage')) {
    let redisData = {};
    let commandHistory = [];
    let currentDb = 0;

    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');

    function scrollToBottom() {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function executeCommand(cmd) {
        const parts = cmd.trim().split(/\s+/);
        const command = parts[0].toUpperCase();

        try {
            switch (command) {
                case 'SET':
                    if (parts.length < 3) return '(error) ERR wrong number of arguments for \'set\' command';
                    const setKey = parts[1];
                    const setValue = cmd.substring(cmd.indexOf(' ', 5) + 1);
                    redisData[setKey] = { type: 'string', value: setValue };
                    return 'OK';

                case 'GET':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'get\' command';
                    const getKey = parts[1];
                    const getVal = redisData[getKey];
                    if (!getVal) return '(nil)';
                    return getVal.value;

                case 'DEL':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'del\' command';
                    const delKeys = parts.slice(1);
                    let delCount = 0;
                    delKeys.forEach(key => {
                        if (redisData[key]) {
                            delete redisData[key];
                            delCount++;
                        }
                    });
                    return `(integer) ${delCount}`;

                case 'EXISTS':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'exists\' command';
                    const existsKeys = parts.slice(1);
                    const existsCount = existsKeys.filter(key => redisData[key]).length;
                    return `(integer) ${existsCount}`;

                case 'TYPE':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'type\' command';
                    const typeKey = parts[1];
                    const typeData = redisData[typeKey];
                    if (!typeData) return 'none';
                    return typeData.type;

                case 'KEYS':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'keys\' command';
                    const pattern = parts[1];
                    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
                    const keys = Object.keys(redisData).filter(key => regex.test(key));
                    if (keys.length === 0) return '(empty array)';
                    return keys.map(key => `"${key}"`).join('\n');

                case 'FLUSHDB':
                    redisData = {};
                    return 'OK';

                case 'DBSIZE':
                    return `(integer) ${Object.keys(redisData).length}`;

                case 'SELECT':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'select\' command';
                    const dbIndex = parseInt(parts[1]);
                    if (isNaN(dbIndex) || dbIndex < 0 || dbIndex > 15) {
                        return '(error) ERR DB index is out of range';
                    }
                    currentDb = dbIndex;
                    return 'OK';

                case 'INCR':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'incr\' command';
                    const incrKey = parts[1];
                    const currentVal = redisData[incrKey];
                    let newVal = 1;
                    if (currentVal) {
                        const numVal = parseInt(currentVal.value);
                        if (isNaN(numVal)) return '(error) ERR value is not an integer or out of range';
                        newVal = numVal + 1;
                    }
                    redisData[incrKey] = { type: 'string', value: newVal.toString() };
                    return `(integer) ${newVal}`;

                case 'DECR':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'decr\' command';
                    const decrKey = parts[1];
                    const decrVal = redisData[decrKey];
                    let decrNewVal = -1;
                    if (decrVal) {
                        const decrNumVal = parseInt(decrVal.value);
                        if (isNaN(decrNumVal)) return '(error) ERR value is not an integer or out of range';
                        decrNewVal = decrNumVal - 1;
                    }
                    redisData[decrKey] = { type: 'string', value: decrNewVal.toString() };
                    return `(integer) ${decrNewVal}`;

                case 'INCRBY':
                    if (parts.length < 3) return '(error) ERR wrong number of arguments for \'incrby\' command';
                    const incrbyKey = parts[1];
                    const incrbyAmount = parseInt(parts[2]);
                    if (isNaN(incrbyAmount)) return '(error) ERR value is not an integer or out of range';
                    const incrbyVal = redisData[incrbyKey];
                    let incrbyNewVal = incrbyAmount;
                    if (incrbyVal) {
                        const incrbyNumVal = parseInt(incrbyVal.value);
                        if (isNaN(incrbyNumVal)) return '(error) ERR value is not an integer or out of range';
                        incrbyNewVal = incrbyNumVal + incrbyAmount;
                    }
                    redisData[incrbyKey] = { type: 'string', value: incrbyNewVal.toString() };
                    return `(integer) ${incrbyNewVal}`;

                case 'DECRBY':
                    if (parts.length < 3) return '(error) ERR wrong number of arguments for \'decrby\' command';
                    const decrbyKey = parts[1];
                    const decrbyAmount = parseInt(parts[2]);
                    if (isNaN(decrbyAmount)) return '(error) ERR value is not an integer or out of range';
                    const decrbyVal = redisData[decrbyKey];
                    let decrbyNewVal = -decrbyAmount;
                    if (decrbyVal) {
                        const decrbyNumVal = parseInt(decrbyVal.value);
                        if (isNaN(decrbyNumVal)) return '(error) ERR value is not an integer or out of range';
                        decrbyNewVal = decrbyNumVal - decrbyAmount;
                    }
                    redisData[decrbyKey] = { type: 'string', value: decrbyNewVal.toString() };
                    return `(integer) ${decrbyNewVal}`;

                case 'MGET':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'mget\' command';
                    const mgetKeys = parts.slice(1);
                    const mgetValues = mgetKeys.map(key => {
                        const val = redisData[key];
                        return val ? val.value : '(nil)';
                    });
                    return mgetValues.map(v => `"${v}"`).join('\n');

                case 'MSET':
                    if (parts.length < 3 || parts.length % 2 === 0) return '(error) ERR wrong number of arguments for \'mset\' command';
                    for (let i = 1; i < parts.length; i += 2) {
                        redisData[parts[i]] = { type: 'string', value: parts[i + 1] };
                    }
                    return 'OK';

                case 'HSET':
                    if (parts.length < 4) return '(error) ERR wrong number of arguments for \'hset\' command';
                    const hsetKey = parts[1];
                    const hsetField = parts[2];
                    const hsetValue = cmd.substring(cmd.indexOf(' ', 5) + 1).substring(cmd.indexOf(' ', 5) + 1).trim();
                    if (!redisData[hsetKey] || redisData[hsetKey].type !== 'hash') {
                        redisData[hsetKey] = { type: 'hash', value: {} };
                    }
                    redisData[hsetKey].value[hsetField] = hsetValue;
                    return '(integer) 1';

                case 'HGET':
                    if (parts.length < 3) return '(error) ERR wrong number of arguments for \'hget\' command';
                    const hgetKey = parts[1];
                    const hgetField = parts[2];
                    const hgetVal = redisData[hgetKey];
                    if (!hgetVal || hgetVal.type !== 'hash') return '(nil)';
                    const hashValue = hgetVal.value[hgetField];
                    if (!hashValue) return '(nil)';
                    return hashValue;

                case 'HGETALL':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'hgetall\' command';
                    const hgetAllKey = parts[1];
                    const hgetAllVal = redisData[hgetAllKey];
                    if (!hgetAllVal || hgetAllVal.type !== 'hash') return '(empty array)';
                    const hashData = hgetAllVal.value;
                    let result = '';
                    Object.entries(hashData).forEach(([field, value]) => {
                        result += `"${field}"\n"${value}"\n`;
                    });
                    return result;

                case 'LPUSH':
                    if (parts.length < 3) return '(error) ERR wrong number of arguments for \'lpush\' command';
                    const lpushKey = parts[1];
                    const lpushValues = parts.slice(2).reverse();
                    if (!redisData[lpushKey] || redisData[lpushKey].type !== 'list') {
                        redisData[lpushKey] = { type: 'list', value: [] };
                    }
                    redisData[lpushKey].value.unshift(...lpushValues);
                    return `(integer) ${redisData[lpushKey].value.length}`;

                case 'RPUSH':
                    if (parts.length < 3) return '(error) ERR wrong number of arguments for \'rpush\' command';
                    const rpushKey = parts[1];
                    const rpushValues = parts.slice(2);
                    if (!redisData[rpushKey] || redisData[rpushKey].type !== 'list') {
                        redisData[rpushKey] = { type: 'list', value: [] };
                    }
                    redisData[rpushKey].value.push(...rpushValues);
                    return `(integer) ${redisData[rpushKey].value.length}`;

                case 'LPOP':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'lpop\' command';
                    const lpopKey = parts[1];
                    const lpopVal = redisData[lpopKey];
                    if (!lpopVal || lpopVal.type !== 'list' || lpopVal.value.length === 0) return '(nil)';
                    const poppedValue = lpopVal.value.shift();
                    return poppedValue;

                case 'RPOP':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'rpop\' command';
                    const rpopKey = parts[1];
                    const rpopVal = redisData[rpopKey];
                    if (!rpopVal || rpopVal.type !== 'list' || rpopVal.value.length === 0) return '(nil)';
                    const rpopPoppedValue = rpopVal.value.pop();
                    return rpopPoppedValue;

                case 'LRANGE':
                    if (parts.length < 4) return '(error) ERR wrong number of arguments for \'lrange\' command';
                    const lrangeKey = parts[1];
                    const lrangeStart = parseInt(parts[2]);
                    const lrangeStop = parseInt(parts[3]);
                    const lrangeVal = redisData[lrangeKey];
                    if (!lrangeVal || lrangeVal.type !== 'list') return '(empty array)';
                    const list = lrangeVal.value;
                    const start = lrangeStart < 0 ? list.length + lrangeStart : lrangeStart;
                    const stop = lrangeStop < 0 ? list.length + lrangeStop : lrangeStop;
                    const sliced = list.slice(start, stop + 1);
                    if (sliced.length === 0) return '(empty array)';
                    return sliced.map(v => `"${v}"`).join('\n');

                case 'LLEN':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'llen\' command';
                    const llenKey = parts[1];
                    const llenVal = redisData[llenKey];
                    if (!llenVal || llenVal.type !== 'list') return '(integer) 0';
                    return `(integer) ${llenVal.value.length}`;

                case 'SADD':
                    if (parts.length < 3) return '(error) ERR wrong number of arguments for \'sadd\' command';
                    const saddKey = parts[1];
                    const saddMembers = parts.slice(2);
                    if (!redisData[saddKey] || redisData[saddKey].type !== 'set') {
                        redisData[saddKey] = { type: 'set', value: [] };
                    }
                    const currentSet = new Set(redisData[saddKey].value);
                    saddMembers.forEach(member => currentSet.add(member));
                    redisData[saddKey].value = Array.from(currentSet);
                    return `(integer) ${saddMembers.length}`;

                case 'SREM':
                    if (parts.length < 3) return '(error) ERR wrong number of arguments for \'srem\' command';
                    const sremKey = parts[1];
                    const sremMembers = parts.slice(2);
                    if (!redisData[sremKey] || redisData[sremKey].type !== 'set') return '(integer) 0';
                    const sremSet = new Set(redisData[sremKey].value);
                    sremMembers.forEach(member => sremSet.delete(member));
                    redisData[sremKey].value = Array.from(sremSet);
                    return `(integer) ${sremMembers.length}`;

                case 'SMEMBERS':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'smembers\' command';
                    const smembersKey = parts[1];
                    const smembersVal = redisData[smembersKey];
                    if (!smembersVal || smembersVal.type !== 'set') return '(empty array)';
                    if (smembersVal.value.length === 0) return '(empty array)';
                    return smembersVal.value.map(v => `"${v}"`).join('\n');

                case 'SCARD':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'scard\' command';
                    const scardKey = parts[1];
                    const scardVal = redisData[scardKey];
                    if (!scardVal || scardVal.type !== 'set') return '(integer) 0';
                    return `(integer) ${scardVal.value.length}`;

                case 'ZADD':
                    if (parts.length < 4) return '(error) ERR wrong number of arguments for \'zadd\' command';
                    const zaddKey = parts[1];
                    const zaddScore = parseFloat(parts[2]);
                    const zaddMember = parts[3];
                    if (isNaN(zaddScore)) return '(error) ERR value is not a valid float';
                    if (!redisData[zaddKey] || redisData[zaddKey].type !== 'zset') {
                        redisData[zaddKey] = { type: 'zset', value: [] };
                    }
                    const zset = redisData[zaddKey].value;
                    const existingIndex = zset.findIndex(m => m.member === zaddMember);
                    if (existingIndex >= 0) {
                        zset[existingIndex].score = zaddScore;
                    } else {
                        zset.push({ score: zaddScore, member: zaddMember });
                    }
                    zset.sort((a, b) => a.score - b.score);
                    return '(integer) 1';

                case 'ZRANGE':
                    if (parts.length < 4) return '(error) ERR wrong number of arguments for \'zrange\' command';
                    const zrangeKey = parts[1];
                    const zrangeStart = parseInt(parts[2]);
                    const zrangeStop = parseInt(parts[3]);
                    const zrangeVal = redisData[zrangeKey];
                    if (!zrangeVal || zrangeVal.type !== 'zset') return '(empty array)';
                    const zsetArr = zrangeVal.value;
                    const zStart = zrangeStart < 0 ? zsetArr.length + zrangeStart : zrangeStart;
                    const zStop = zrangeStop < 0 ? zsetArr.length + zrangeStop : zrangeStop;
                    const zSliced = zsetArr.slice(zStart, zStop + 1);
                    if (zSliced.length === 0) return '(empty array)';
                    return zSliced.map(v => `"${v.member}"\n"${v.score}"`).join('\n');

                case 'ZCARD':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'zcard\' command';
                    const zcardKey = parts[1];
                    const zcardVal = redisData[zcardKey];
                    if (!zcardVal || zcardVal.type !== 'zset') return '(integer) 0';
                    return `(integer) ${zcardVal.value.length}`;

                // JSON 命令
                case 'JSON.SET':
                    if (parts.length < 4) return '(error) ERR wrong number of arguments for \'json.set\' command';
                    const jsonSetKey = parts[1];
                    const jsonSetPath = parts[2];
                    const jsonSetValueStr = cmd.substring(cmd.indexOf(parts[2]) + parts[2].length + 1).trim();
                    let jsonSetValue;
                    try {
                        jsonSetValue = JSON.parse(jsonSetValueStr.replace(/^'(.*)'$/, '$1').replace(/^"(.*)"$/, '$1'));
                    } catch (e) {
                        return '(error) ERR invalid JSON value';
                    }
                    if (!redisData[jsonSetKey] || redisData[jsonSetKey].type !== 'json') {
                        redisData[jsonSetKey] = { type: 'json', value: {} };
                    }
                    if (jsonSetPath === '$') {
                        redisData[jsonSetKey].value = jsonSetValue;
                    } else {
                        const path = jsonSetPath.substring(2).split('.');
                        let current = redisData[jsonSetKey].value;
                        for (let i = 0; i < path.length - 1; i++) {
                            if (!current[path[i]]) current[path[i]] = {};
                            current = current[path[i]];
                        }
                        current[path[path.length - 1]] = jsonSetValue;
                    }
                    return 'OK';

                case 'JSON.GET':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'json.get\' command';
                    const jsonGetKey = parts[1];
                    const jsonGetPath = parts[2] || '$';
                    const jsonGetData = redisData[jsonGetKey];
                    if (!jsonGetData || jsonGetData.type !== 'json') return '(nil)';
                    let jsonResult;
                    if (jsonGetPath === '$') {
                        jsonResult = jsonGetData.value;
                    } else {
                        const path = jsonGetPath.substring(2).split('.');
                        jsonResult = jsonGetData.value;
                        for (const p of path) {
                            if (!jsonResult) return '(nil)';
                            jsonResult = jsonResult[p];
                        }
                    }
                    if (jsonResult === undefined) return '(nil)';
                    return JSON.stringify(jsonResult, null, 2);

                case 'JSON.DEL':
                    if (parts.length < 3) return '(error) ERR wrong number of arguments for \'json.del\' command';
                    const jsonDelKey = parts[1];
                    const jsonDelPath = parts[2];
                    const jsonDelData = redisData[jsonDelKey];
                    if (!jsonDelData || jsonDelData.type !== 'json') return '(integer) 0';
                    if (jsonDelPath === '$') {
                        delete redisData[jsonDelKey];
                        return '(integer) 1';
                    }
                    const delPath = jsonDelPath.substring(2).split('.');
                    let delCurrent = jsonDelData.value;
                    for (let i = 0; i < delPath.length - 1; i++) {
                        if (!delCurrent[delPath[i]]) return '(integer) 0';
                        delCurrent = delCurrent[delPath[i]];
                    }
                    if (delCurrent[delPath[delPath.length - 1]] !== undefined) {
                        delete delCurrent[delPath[delPath.length - 1]];
                        return '(integer) 1';
                    }
                    return '(integer) 0';

                case 'JSON.MGET':
                    if (parts.length < 3) return '(error) ERR wrong number of arguments for \'json.mget\' command';
                    const jsonMgetPath = parts[1];
                    const jsonMgetKeys = parts.slice(2);
                    const mgetResults = [];
                    jsonMgetKeys.forEach(key => {
                        const data = redisData[key];
                        if (!data || data.type !== 'json') {
                            mgetResults.push(null);
                            return;
                        }
                        if (jsonMgetPath === '$') {
                            mgetResults.push(data.value);
                        } else {
                            const path = jsonMgetPath.substring(2).split('.');
                            let result = data.value;
                            for (const p of path) {
                                if (!result) {
                                    result = null;
                                    break;
                                }
                                result = result[p];
                            }
                            mgetResults.push(result);
                        }
                    });
                    return JSON.stringify(mgetResults, null, 2);

                case 'JSON.MSET':
                    if (parts.length < 6 || parts.length % 3 !== 0) return '(error) ERR wrong number of arguments for \'json.mset\' command';
                    for (let i = 1; i < parts.length; i += 3) {
                        const key = parts[i];
                        const path = parts[i + 1];
                        const valueStr = parts[i + 2];
                        let value;
                        try {
                            value = JSON.parse(valueStr.replace(/^'(.*)'$/, '$1').replace(/^"(.*)"$/, '$1'));
                        } catch (e) {
                            continue;
                        }
                        if (!redisData[key] || redisData[key].type !== 'json') {
                            redisData[key] = { type: 'json', value: {} };
                        }
                        if (path === '$') {
                            redisData[key].value = value;
                        } else {
                            const pathParts = path.substring(2).split('.');
                            let current = redisData[key].value;
                            for (let j = 0; j < pathParts.length - 1; j++) {
                                if (!current[pathParts[j]]) current[pathParts[j]] = {};
                                current = current[pathParts[j]];
                            }
                            current[pathParts[pathParts.length - 1]] = value;
                        }
                    }
                    return 'OK';

                case 'JSON.TYPE':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'json.type\' command';
                    const jsonTypeKey = parts[1];
                    const jsonTypePath = parts[2] || '$';
                    const jsonTypeData = redisData[jsonTypeKey];
                    if (!jsonTypeData || jsonTypeData.type !== 'json') return 'none';
                    let jsonTypeValue = jsonTypeData.value;
                    if (jsonTypePath !== '$') {
                        const path = jsonTypePath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonTypeValue) return 'none';
                            jsonTypeValue = jsonTypeValue[p];
                        }
                    }
                    if (jsonTypeValue === undefined || jsonTypeValue === null) return 'none';
                    const type = Array.isArray(jsonTypeValue) ? 'array' : typeof jsonTypeValue;
                    return type;

                case 'JSON.STRLEN':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'json.strlen\' command';
                    const jsonStrlenKey = parts[1];
                    const jsonStrlenPath = parts[2] || '$';
                    const jsonStrlenData = redisData[jsonStrlenKey];
                    if (!jsonStrlenData || jsonStrlenData.type !== 'json') return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                    let jsonStrlenValue = jsonStrlenData.value;
                    if (jsonStrlenPath !== '$') {
                        const path = jsonStrlenPath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonStrlenValue) return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                            jsonStrlenValue = jsonStrlenValue[p];
                        }
                    }
                    if (typeof jsonStrlenValue !== 'string') return '(error) ERR could not perform this operation on a key that doesn\'t contain a string';
                    return `(integer) ${jsonStrlenValue.length}`;

                case 'JSON.OBJLEN':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'json.objlen\' command';
                    const jsonObjlenKey = parts[1];
                    const jsonObjlenPath = parts[2] || '$';
                    const jsonObjlenData = redisData[jsonObjlenKey];
                    if (!jsonObjlenData || jsonObjlenData.type !== 'json') return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                    let jsonObjlenValue = jsonObjlenData.value;
                    if (jsonObjlenPath !== '$') {
                        const path = jsonObjlenPath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonObjlenValue) return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                            jsonObjlenValue = jsonObjlenValue[p];
                        }
                    }
                    if (typeof jsonObjlenValue !== 'object' || jsonObjlenValue === null || Array.isArray(jsonObjlenValue)) {
                        return '(error) ERR could not perform this operation on a key that doesn\'t contain a JSON object';
                    }
                    return `(integer) ${Object.keys(jsonObjlenValue).length}`;

                case 'JSON.ARRLEN':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'json.arrlen\' command';
                    const jsonArrlenKey = parts[1];
                    const jsonArrlenPath = parts[2] || '$';
                    const jsonArrlenData = redisData[jsonArrlenKey];
                    if (!jsonArrlenData || jsonArrlenData.type !== 'json') return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                    let jsonArrlenValue = jsonArrlenData.value;
                    if (jsonArrlenPath !== '$') {
                        const path = jsonArrlenPath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonArrlenValue) return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                            jsonArrlenValue = jsonArrlenValue[p];
                        }
                    }
                    if (!Array.isArray(jsonArrlenValue)) {
                        return '(error) ERR could not perform this operation on a key that doesn\'t contain a JSON array';
                    }
                    return `(integer) ${jsonArrlenValue.length}`;

                case 'JSON.ARRINDEX':
                    if (parts.length < 4) return '(error) ERR wrong number of arguments for \'json.arrindex\' command';
                    const jsonArrindexKey = parts[1];
                    const jsonArrindexPath = parts[2];
                    const jsonArrindexValue = parts[3];
                    const jsonArrindexData = redisData[jsonArrindexKey];
                    if (!jsonArrindexData || jsonArrindexData.type !== 'json') return '(integer) -1';
                    let jsonArrindexArr = jsonArrindexData.value;
                    if (jsonArrindexPath !== '$') {
                        const path = jsonArrindexPath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonArrindexArr) return '(integer) -1';
                            jsonArrindexArr = jsonArrindexArr[p];
                        }
                    }
                    if (!Array.isArray(jsonArrindexArr)) return '(integer) -1';
                    const index = jsonArrindexArr.indexOf(jsonArrindexValue);
                    return `(integer) ${index}`;

                case 'JSON.NUMINCRBY':
                    if (parts.length < 4) return '(error) ERR wrong number of arguments for \'json.numincrby\' command';
                    const jsonNumincrbyKey = parts[1];
                    const jsonNumincrbyPath = parts[2];
                    const jsonNumincrbyValue = parseFloat(parts[3]);
                    if (isNaN(jsonNumincrbyValue)) return '(error) ERR could not parse this as a number';
                    const jsonNumincrbyData = redisData[jsonNumincrbyKey];
                    if (!jsonNumincrbyData || jsonNumincrbyData.type !== 'json') return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                    let jsonNumincrbyTarget = jsonNumincrbyData.value;
                    if (jsonNumincrbyPath !== '$') {
                        const path = jsonNumincrbyPath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonNumincrbyTarget) return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                            jsonNumincrbyTarget = jsonNumincrbyTarget[p];
                        }
                    }
                    if (typeof jsonNumincrbyTarget !== 'number') {
                        return '(error) ERR could not perform this operation on a key that doesn\'t contain a number';
                    }
                    const newNumValue = jsonNumincrbyTarget + jsonNumincrbyValue;
                    return JSON.stringify(newNumValue);

                case 'JSON.TOGGLE':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'json.toggle\' command';
                    const jsonToggleKey = parts[1];
                    const jsonTogglePath = parts[2] || '$';
                    const jsonToggleData = redisData[jsonToggleKey];
                    if (!jsonToggleData || jsonToggleData.type !== 'json') return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                    let jsonToggleTarget = jsonToggleData.value;
                    if (jsonTogglePath !== '$') {
                        const path = jsonTogglePath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonToggleTarget) return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                            jsonToggleTarget = jsonToggleTarget[p];
                        }
                    }
                    if (typeof jsonToggleTarget !== 'boolean') {
                        return '(error) ERR could not perform this operation on a key that doesn\'t contain a boolean';
                    }
                    return JSON.stringify(!jsonToggleTarget);

                case 'JSON.ARRAPPEND':
                    if (parts.length < 4) return '(error) ERR wrong number of arguments for \'json.arrappend\' command';
                    const jsonArrappendKey = parts[1];
                    const jsonArrappendPath = parts[2];
                    const jsonArrappendValues = parts.slice(3);
                    const jsonArrappendData = redisData[jsonArrappendKey];
                    if (!jsonArrappendData || jsonArrappendData.type !== 'json') {
                        redisData[jsonArrappendKey] = { type: 'json', value: [] };
                    }
                    let jsonArrappendArr = jsonArrappendData.value;
                    if (jsonArrappendPath !== '$') {
                        const path = jsonArrappendPath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonArrappendArr[p]) jsonArrappendArr[p] = [];
                            jsonArrappendArr = jsonArrappendArr[p];
                        }
                    }
                    if (!Array.isArray(jsonArrappendArr)) {
                        return '(error) ERR could not perform this operation on a key that doesn\'t contain a JSON array';
                    }
                    jsonArrappendArr.push(...jsonArrappendValues);
                    return `(integer) ${jsonArrappendArr.length}`;

                case 'JSON.ARRINSERT':
                    if (parts.length < 5) return '(error) ERR wrong number of arguments for \'json.arrinsert\' command';
                    const jsonArrinsertKey = parts[1];
                    const jsonArrinsertPath = parts[2];
                    const jsonArrinsertIndex = parseInt(parts[3]);
                    const jsonArrinsertValues = parts.slice(4);
                    const jsonArrinsertData = redisData[jsonArrinsertKey];
                    if (!jsonArrinsertData || jsonArrinsertData.type !== 'json') return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                    let jsonArrinsertArr = jsonArrinsertData.value;
                    if (jsonArrinsertPath !== '$') {
                        const path = jsonArrinsertPath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonArrinsertArr[p]) return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                            jsonArrinsertArr = jsonArrinsertArr[p];
                        }
                    }
                    if (!Array.isArray(jsonArrinsertArr)) {
                        return '(error) ERR could not perform this operation on a key that doesn\'t contain a JSON array';
                    }
                    jsonArrinsertArr.splice(jsonArrinsertIndex, 0, ...jsonArrinsertValues);
                    return `(integer) ${jsonArrinsertArr.length}`;

                case 'JSON.ARRPOP':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'json.arrpop\' command';
                    const jsonArrpopKey = parts[1];
                    const jsonArrpopPath = parts[2] || '$';
                    const jsonArrpopIndex = parts[3] ? parseInt(parts[3]) : -1;
                    const jsonArrpopData = redisData[jsonArrpopKey];
                    if (!jsonArrpopData || jsonArrpopData.type !== 'json') return '(nil)';
                    let jsonArrpopArr = jsonArrpopData.value;
                    if (jsonArrpopPath !== '$') {
                        const path = jsonArrpopPath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonArrpopArr[p]) return '(nil)';
                            jsonArrpopArr = jsonArrpopArr[p];
                        }
                    }
                    if (!Array.isArray(jsonArrpopArr) || jsonArrpopArr.length === 0) return '(nil)';
                    const actualIndex = jsonArrpopIndex < 0 ? jsonArrpopArr.length + jsonArrpopIndex : jsonArrpopIndex;
                    const popped = jsonArrpopArr.splice(actualIndex, 1)[0];
                    return JSON.stringify(popped);

                case 'JSON.STRAPPEND':
                    if (parts.length < 4) return '(error) ERR wrong number of arguments for \'json.strappend\' command';
                    const jsonStrappendKey = parts[1];
                    const jsonStrappendPath = parts[2];
                    const jsonStrappendValue = parts[3];
                    const jsonStrappendData = redisData[jsonStrappendKey];
                    if (!jsonStrappendData || jsonStrappendData.type !== 'json') return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                    let jsonStrappendTarget = jsonStrappendData.value;
                    if (jsonStrappendPath !== '$') {
                        const path = jsonStrappendPath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonStrappendTarget[p]) return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                            jsonStrappendTarget = jsonStrappendTarget[p];
                        }
                    }
                    if (typeof jsonStrappendTarget !== 'string') {
                        return '(error) ERR could not perform this operation on a key that doesn\'t contain a string';
                    }
                    return `(integer) ${jsonStrappendTarget.length + jsonStrappendValue.length}`;

                case 'JSON.CLEAR':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'json.clear\' command';
                    const jsonClearKey = parts[1];
                    const jsonClearPath = parts[2] || '$';
                    const jsonClearData = redisData[jsonClearKey];
                    if (!jsonClearData || jsonClearData.type !== 'json') return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                    let jsonClearTarget = jsonClearData.value;
                    if (jsonClearPath !== '$') {
                        const path = jsonClearPath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonClearTarget[p]) return '(error) ERR could not perform this operation on a key that doesn\'t exist';
                            jsonClearTarget = jsonClearTarget[p];
                        }
                    }
                    if (Array.isArray(jsonClearTarget)) {
                        jsonClearTarget.length = 0;
                        return '(integer) 1';
                    } else if (typeof jsonClearTarget === 'object' && jsonClearTarget !== null) {
                        Object.keys(jsonClearTarget).forEach(key => delete jsonClearTarget[key]);
                        return '(integer) 1';
                    }
                    return '(integer) 0';

                case 'JSON.OBJKEYS':
                    if (parts.length < 2) return '(error) ERR wrong number of arguments for \'json.objkeys\' command';
                    const jsonObjkeysKey = parts[1];
                    const jsonObjkeysPath = parts[2] || '$';
                    const jsonObjkeysData = redisData[jsonObjkeysKey];
                    if (!jsonObjkeysData || jsonObjkeysData.type !== 'json') return '(empty array)';
                    let jsonObjkeysTarget = jsonObjkeysData.value;
                    if (jsonObjkeysPath !== '$') {
                        const path = jsonObjkeysPath.substring(2).split('.');
                        for (const p of path) {
                            if (!jsonObjkeysTarget[p]) return '(empty array)';
                            jsonObjkeysTarget = jsonObjkeysTarget[p];
                        }
                    }
                    if (typeof jsonObjkeysTarget !== 'object' || jsonObjkeysTarget === null || Array.isArray(jsonObjkeysTarget)) {
                        return '(empty array)';
                    }
                    return Object.keys(jsonObjkeysTarget).map(k => `"${k}"`).join('\n');

                case 'HELP':
                    return `可用命令：\nSET key value - 设置键值对\nGET key - 获取键值\nDEL key - 删除键\nEXISTS key - 检查键是否存在\nTYPE key - 获取键的类型\nKEYS pattern - 查找键\nFLUSHDB - 清空数据库\nDBSIZE - 获取键的数量\nSELECT index - 切换数据库\nINCR key - 键值加1\nDECR key - 键值减1\nINCRBY key increment - 键值增加指定数量\nDECRBY key decrement - 键值减少指定数量\nMGET key1 key2... - 获取多个键的值\nMSET key1 value1 key2 value2... - 设置多个键的值\nHSET key field value - 设置哈希字段\nHGET key field - 获取哈希字段\nHGETALL key - 获取所有哈希字段\nLPUSH key value - 向列表头部插入\nRPUSH key value - 向列表尾部插入\nLPOP key - 从列表头部弹出\nRPOP key - 从列表尾部弹出\nLRANGE key start stop - 获取列表范围\nLLEN key - 获取列表长度\nSADD key member - 向集合添加成员\nSREM key member - 从集合删除成员\nSMEMBERS key - 获取集合所有成员\nSCARD key - 获取集合成员数\nZADD key score member - 向有序集合添加成员\nZRANGE key start stop - 获取有序集合范围\nZCARD key - 获取有序集合成员数\nJSON.SET key path value - 设置 JSON 值\nJSON.GET key [path] - 获取 JSON 值\nJSON.DEL key [path] - 删除 JSON 值\nJSON.MGET path key1 key2... - 从多个键获取 JSON 值\nJSON.MSET key1 path1 value1... - 设置多个 JSON 值\nJSON.TYPE key [path] - 获取 JSON 值类型\nJSON.STRLEN key [path] - 获取 JSON 字符串长度\nJSON.OBJLEN key [path] - 获取 JSON 对象键数量\nJSON.ARRLEN key [path] - 获取 JSON 数组长度\nJSON.ARRINDEX key path value - 在 JSON 数组中查找索引\nJSON.NUMINCRBY key path value - 增加 JSON 数字值\nJSON.TOGGLE key [path] - 切换 JSON 布尔值\nJSON.ARRAPPEND key path value... - 向 JSON 数组追加值\nJSON.ARRINSERT key path index value... - 向 JSON 数组插入值\nJSON.ARRPOP key [path] [index] - 从 JSON 数组弹出值\nJSON.STRAPPEND key path value - 向 JSON 字符串追加值\nJSON.CLEAR key [path] - 清空 JSON 数组/对象\nJSON.OBJKEYS key [path] - 获取 JSON 对象所有键\nHELP - 显示帮助信息`;

                case 'CLEAR':
                    commandHistory = [];
                    return '';

                default:
                    return `(error) ERR unknown command '${command}'`;
            }
        } catch (error) {
            return `(error) ${error}`;
        }
    }

    function addOutput(command, result) {
        if (result === '') return;

        const commandLine = document.createElement('div');
        commandLine.className = 'command-line';
        commandLine.innerHTML = `<span class="terminal-prompt">127.0.0.1:6379[${currentDb}]</span> &gt; ${command}`;

        const resultLine = document.createElement('div');
        resultLine.className = 'result-line';
        resultLine.textContent = result;

        terminalOutput.appendChild(commandLine);
        terminalOutput.appendChild(resultLine);

        commandHistory.push({ command, result, timestamp: new Date() });
        scrollToBottom();
    }

    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim();
            if (command) {
                const result = executeCommand(command);
                addOutput(command, result);
                terminalInput.value = '';
            }
        }
    });

    // 清空按钮
    document.getElementById('clearBtn').addEventListener('click', () => {
        terminalOutput.innerHTML = '';
        commandHistory = [];
    });

    // 快速命令
    document.querySelectorAll('.quick-command-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            terminalInput.value = btn.textContent;
            terminalInput.focus();
        });
    });

    // 初始化欢迎信息
    addOutput('', '欢迎使用 Redis CLI 交互式演示！\n输入 HELP 查看可用命令列表。');
}

// 教程页面平滑滚动
if (document.getElementById('tutorialPage')) {
    document.querySelectorAll('.sidebar-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // 更新活动状态
                document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}