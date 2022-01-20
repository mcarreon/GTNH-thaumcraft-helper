var buckets = {
    defaultCompare: function (a, b) {
        return a < b ? -1 : a === b ? 0 : 1;
    },
    defaultEquals: function (a, b) {
        return a === b;
    },
    defaultToString: function (a) {
        return null === a ? "BUCKETS_NULL" : buckets.isUndefined(a) ? "BUCKETS_UNDEFINED" : buckets.isString(a) ? a : a.toString();
    },
    isFunction: function (a) {
        return "function" === typeof a;
    },
    isUndefined: function (a) {
        return "undefined" === typeof a;
    },
    isString: function (a) {
        return "[object String]" === Object.prototype.toString.call(a);
    },
    reverseCompareFunction: function (a) {
        return buckets.isFunction(a)
            ? function (b, c) {
                  return -1 * a(b, c);
              }
            : function (a, c) {
                  return a < c ? 1 : a === c ? 0 : -1;
              };
    },
    compareToEquals: function (a) {
        return function (b, c) {
            return 0 === a(b, c);
        };
    },
    arrays: {},
};
buckets.arrays.indexOf = function (a, b, c) {
    c = c || buckets.defaultEquals;
    for (var d = a.length, e = 0; e < d; e++) if (c(a[e], b)) return e;
    return -1;
};
buckets.arrays.lastIndexOf = function (a, b, c) {
    c = c || buckets.defaultEquals;
    for (var d = a.length - 1; 0 <= d; d--) if (c(a[d], b)) return d;
    return -1;
};
buckets.arrays.contains = function (a, b, c) {
    return 0 <= buckets.arrays.indexOf(a, b, c);
};
buckets.arrays.remove = function (a, b, c) {
    b = buckets.arrays.indexOf(a, b, c);
    if (0 > b) return !1;
    a.splice(b, 1);
    return !0;
};
buckets.arrays.frequency = function (a, b, c) {
    c = c || buckets.defaultEquals;
    for (var d = a.length, e = 0, f = 0; f < d; f++) c(a[f], b) && e++;
    return e;
};
buckets.arrays.equals = function (a, b, c) {
    c = c || buckets.defaultEquals;
    if (a.length !== b.length) return !1;
    for (var d = a.length, e = 0; e < d; e++) if (!c(a[e], b[e])) return !1;
    return !0;
};
buckets.arrays.copy = function (a) {
    return a.concat();
};
buckets.arrays.swap = function (a, b, c) {
    if (0 > b || b >= a.length || 0 > c || c >= a.length) return !1;
    var d = a[b];
    a[b] = a[c];
    a[c] = d;
    return !0;
};
buckets.arrays.forEach = function (a, b) {
    for (var c = a.length, d = 0; d < c && !1 !== b(a[d]); d++);
};
buckets.LinkedList = function () {
    this.lastNode = this.firstNode = null;
    this.nElements = 0;
};
buckets.LinkedList.prototype.add = function (a, b) {
    buckets.isUndefined(b) && (b = this.nElements);
    if (0 > b || b > this.nElements || buckets.isUndefined(a)) return !1;
    var c = this.createNode(a);
    if (0 === this.nElements) this.lastNode = this.firstNode = c;
    else if (b === this.nElements) this.lastNode = this.lastNode.next = c;
    else if (0 === b) (c.next = this.firstNode), (this.firstNode = c);
    else {
        var d = this.nodeAtIndex(b - 1);
        c.next = d.next;
        d.next = c;
    }
    this.nElements++;
    return !0;
};
buckets.LinkedList.prototype.first = function () {
    if (null !== this.firstNode) return this.firstNode.element;
};
buckets.LinkedList.prototype.last = function () {
    if (null !== this.lastNode) return this.lastNode.element;
};
buckets.LinkedList.prototype.elementAtIndex = function (a) {
    a = this.nodeAtIndex(a);
    return null === a ? void 0 : a.element;
};
buckets.LinkedList.prototype.indexOf = function (a, b) {
    var c = b || buckets.defaultEquals;
    if (buckets.isUndefined(a)) return -1;
    for (var d = this.firstNode, e = 0; null !== d; ) {
        if (c(d.element, a)) return e;
        e++;
        d = d.next;
    }
    return -1;
};
buckets.LinkedList.prototype.contains = function (a, b) {
    return 0 <= this.indexOf(a, b);
};
buckets.LinkedList.prototype.remove = function (a, b) {
    var c = b || buckets.defaultEquals;
    if (1 > this.nElements || buckets.isUndefined(a)) return !1;
    for (var d = null, e = this.firstNode; null !== e; ) {
        if (c(e.element, a))
            return e === this.firstNode ? ((this.firstNode = this.firstNode.next), e === this.lastNode && (this.lastNode = null)) : (e === this.lastNode && (this.lastNode = d), (d.next = e.next), (e.next = null)), this.nElements--, !0;
        d = e;
        e = e.next;
    }
    return !1;
};
buckets.LinkedList.prototype.clear = function () {
    this.lastNode = this.firstNode = null;
    this.nElements = 0;
};
buckets.LinkedList.prototype.equals = function (a, b) {
    var c = b || buckets.defaultEquals;
    return !(a instanceof buckets.LinkedList) || this.size() !== a.size() ? !1 : this.equalsAux(this.firstNode, a.firstNode, c);
};
buckets.LinkedList.prototype.equalsAux = function (a, b, c) {
    for (; null !== a; ) {
        if (!c(a.element, b.element)) return !1;
        a = a.next;
        b = b.next;
    }
    return !0;
};
buckets.LinkedList.prototype.removeElementAtIndex = function (a) {
    if (!(0 > a || a >= this.nElements)) {
        var b;
        1 === this.nElements
            ? ((b = this.firstNode.element), (this.lastNode = this.firstNode = null))
            : ((a = this.nodeAtIndex(a - 1)),
              null === a ? ((b = this.firstNode.element), (this.firstNode = this.firstNode.next)) : a.next === this.lastNode && ((b = this.lastNode.element), (this.lastNode = a)),
              null !== a && ((b = a.next.element), (a.next = a.next.next)));
        this.nElements--;
        return b;
    }
};
buckets.LinkedList.prototype.forEach = function (a) {
    for (var b = this.firstNode; null !== b && !1 !== a(b.element); ) b = b.next;
};
buckets.LinkedList.prototype.reverse = function () {
    for (var a = null, b = this.firstNode, c = null; null !== b; ) (c = b.next), (b.next = a), (a = b), (b = c);
    c = this.firstNode;
    this.firstNode = this.lastNode;
    this.lastNode = c;
};
buckets.LinkedList.prototype.toArray = function () {
    for (var a = [], b = this.firstNode; null !== b; ) a.push(b.element), (b = b.next);
    return a;
};
buckets.LinkedList.prototype.size = function () {
    return this.nElements;
};
buckets.LinkedList.prototype.isEmpty = function () {
    return 0 >= this.nElements;
};
buckets.LinkedList.prototype.nodeAtIndex = function (a) {
    if (0 > a || a >= this.nElements) return null;
    if (a === this.nElements - 1) return this.lastNode;
    for (var b = this.firstNode, c = 0; c < a; c++) b = b.next;
    return b;
};
buckets.LinkedList.prototype.createNode = function (a) {
    return { element: a, next: null };
};
buckets.Dictionary = function (a) {
    this.table = {};
    this.nElements = 0;
    this.toStr = a || buckets.defaultToString;
};
buckets.Dictionary.prototype.get = function (a) {
    a = this.table[this.toStr(a)];
    return buckets.isUndefined(a) ? void 0 : a.value;
};
buckets.Dictionary.prototype.set = function (a, b) {
    if (!buckets.isUndefined(a) && !buckets.isUndefined(b)) {
        var c,
            d = this.toStr(a);
        c = this.table[d];
        buckets.isUndefined(c) ? (this.nElements++, (c = void 0)) : (c = c.value);
        this.table[d] = { key: a, value: b };
        return c;
    }
};
buckets.Dictionary.prototype.remove = function (a) {
    a = this.toStr(a);
    var b = this.table[a];
    if (!buckets.isUndefined(b)) return delete this.table[a], this.nElements--, b.value;
};
buckets.Dictionary.prototype.keys = function () {
    var a = [],
        b;
    for (b in this.table) this.table.hasOwnProperty(b) && a.push(this.table[b].key);
    return a;
};
buckets.Dictionary.prototype.values = function () {
    var a = [],
        b;
    for (b in this.table) this.table.hasOwnProperty(b) && a.push(this.table[b].value);
    return a;
};
buckets.Dictionary.prototype.forEach = function (a) {
    for (var b in this.table)
        if (this.table.hasOwnProperty(b)) {
            var c = this.table[b];
            if (!1 === a(c.key, c.value)) break;
        }
};
buckets.Dictionary.prototype.containsKey = function (a) {
    return !buckets.isUndefined(this.get(a));
};
buckets.Dictionary.prototype.clear = function () {
    this.table = {};
    this.nElements = 0;
};
buckets.Dictionary.prototype.size = function () {
    return this.nElements;
};
buckets.Dictionary.prototype.isEmpty = function () {
    return 0 >= this.nElements;
};
buckets.MultiDictionary = function (a, b) {
    this.parent = new buckets.Dictionary(a);
    this.equalsF = b || buckets.defaultEquals;
};
buckets.MultiDictionary.prototype.get = function (a) {
    a = this.parent.get(a);
    return buckets.isUndefined(a) ? [] : buckets.arrays.copy(a);
};
buckets.MultiDictionary.prototype.set = function (a, b) {
    if (buckets.isUndefined(a) || buckets.isUndefined(b)) return !1;
    if (!this.containsKey(a)) return this.parent.set(a, [b]), !0;
    var c = this.parent.get(a);
    if (buckets.arrays.contains(c, b, this.equalsF)) return !1;
    c.push(b);
    return !0;
};
buckets.MultiDictionary.prototype.remove = function (a, b) {
    if (buckets.isUndefined(b)) {
        var c = this.parent.remove(a);
        return buckets.isUndefined(c) ? !1 : !0;
    }
    c = this.parent.get(a);
    return buckets.arrays.remove(c, b, this.equalsF) ? (0 === c.length && this.parent.remove(a), !0) : !1;
};
buckets.MultiDictionary.prototype.keys = function () {
    return this.parent.keys();
};
buckets.MultiDictionary.prototype.values = function () {
    for (var a = this.parent.values(), b = [], c = 0; c < a.length; c++) for (var d = a[c], e = 0; e < d.length; e++) b.push(d[e]);
    return b;
};
buckets.MultiDictionary.prototype.containsKey = function (a) {
    return this.parent.containsKey(a);
};
buckets.MultiDictionary.prototype.clear = function () {
    return this.parent.clear();
};
buckets.MultiDictionary.prototype.size = function () {
    return this.parent.size();
};
buckets.MultiDictionary.prototype.isEmpty = function () {
    return this.parent.isEmpty();
};
buckets.Heap = function (a) {
    this.data = [];
    this.compare = a || buckets.defaultCompare;
};
buckets.Heap.prototype.leftChildIndex = function (a) {
    return 2 * a + 1;
};
buckets.Heap.prototype.rightChildIndex = function (a) {
    return 2 * a + 2;
};
buckets.Heap.prototype.parentIndex = function (a) {
    return Math.floor((a - 1) / 2);
};
buckets.Heap.prototype.minIndex = function (a, b) {
    return b >= this.data.length ? (a >= this.data.length ? -1 : a) : 0 >= this.compare(this.data[a], this.data[b]) ? a : b;
};
buckets.Heap.prototype.siftUp = function (a) {
    for (var b = this.parentIndex(a); 0 < a && 0 < this.compare(this.data[b], this.data[a]); ) buckets.arrays.swap(this.data, b, a), (a = b), (b = this.parentIndex(a));
};
buckets.Heap.prototype.siftDown = function (a) {
    for (var b = this.minIndex(this.leftChildIndex(a), this.rightChildIndex(a)); 0 <= b && 0 < this.compare(this.data[a], this.data[b]); )
        buckets.arrays.swap(this.data, b, a), (a = b), (b = this.minIndex(this.leftChildIndex(a), this.rightChildIndex(a)));
};
buckets.Heap.prototype.peek = function () {
    if (0 < this.data.length) return this.data[0];
};
buckets.Heap.prototype.add = function (a) {
    if (!buckets.isUndefined(a)) return this.data.push(a), this.siftUp(this.data.length - 1), !0;
};
buckets.Heap.prototype.removeRoot = function () {
    if (0 < this.data.length) {
        var a = this.data[0];
        this.data[0] = this.data[this.data.length - 1];
        this.data.splice(this.data.length - 1, 1);
        0 < this.data.length && this.siftDown(0);
        return a;
    }
};
buckets.Heap.prototype.contains = function (a) {
    var b = buckets.compareToEquals(this.compare);
    return buckets.arrays.contains(this.data, a, b);
};
buckets.Heap.prototype.size = function () {
    return this.data.length;
};
buckets.Heap.prototype.isEmpty = function () {
    return 0 >= this.data.length;
};
buckets.Heap.prototype.clear = function () {
    this.data.length = 0;
};
buckets.Heap.prototype.forEach = function (a) {
    buckets.arrays.forEach(this.data, a);
};
buckets.Stack = function () {
    this.list = new buckets.LinkedList();
};
buckets.Stack.prototype.push = function (a) {
    return this.list.add(a, 0);
};
buckets.Stack.prototype.add = function (a) {
    return this.list.add(a, 0);
};
buckets.Stack.prototype.pop = function () {
    return this.list.removeElementAtIndex(0);
};
buckets.Stack.prototype.peek = function () {
    return this.list.first();
};
buckets.Stack.prototype.size = function () {
    return this.list.size();
};
buckets.Stack.prototype.contains = function (a, b) {
    return this.list.contains(a, b);
};
buckets.Stack.prototype.isEmpty = function () {
    return this.list.isEmpty();
};
buckets.Stack.prototype.clear = function () {
    this.list.clear();
};
buckets.Stack.prototype.forEach = function (a) {
    this.list.forEach(a);
};
buckets.Queue = function () {
    this.list = new buckets.LinkedList();
};
buckets.Queue.prototype.enqueue = function (a) {
    return this.list.add(a);
};
buckets.Queue.prototype.add = function (a) {
    return this.list.add(a);
};
buckets.Queue.prototype.dequeue = function () {
    if (0 !== this.list.size()) {
        var a = this.list.first();
        this.list.removeElementAtIndex(0);
        return a;
    }
};
buckets.Queue.prototype.peek = function () {
    if (0 !== this.list.size()) return this.list.first();
};
buckets.Queue.prototype.size = function () {
    return this.list.size();
};
buckets.Queue.prototype.contains = function (a, b) {
    return this.list.contains(a, b);
};
buckets.Queue.prototype.isEmpty = function () {
    return 0 >= this.list.size();
};
buckets.Queue.prototype.clear = function () {
    this.list.clear();
};
buckets.Queue.prototype.forEach = function (a) {
    this.list.forEach(a);
};
buckets.PriorityQueue = function (a) {
    this.heap = new buckets.Heap(buckets.reverseCompareFunction(a));
};
buckets.PriorityQueue.prototype.enqueue = function (a) {
    return this.heap.add(a);
};
buckets.PriorityQueue.prototype.add = function (a) {
    return this.heap.add(a);
};
buckets.PriorityQueue.prototype.dequeue = function () {
    if (0 !== this.heap.size()) {
        var a = this.heap.peek();
        this.heap.removeRoot();
        return a;
    }
};
buckets.PriorityQueue.prototype.peek = function () {
    return this.heap.peek();
};
buckets.PriorityQueue.prototype.contains = function (a) {
    return this.heap.contains(a);
};
buckets.PriorityQueue.prototype.isEmpty = function () {
    return this.heap.isEmpty();
};
buckets.PriorityQueue.prototype.size = function () {
    return this.heap.size();
};
buckets.PriorityQueue.prototype.clear = function () {
    this.heap.clear();
};
buckets.PriorityQueue.prototype.forEach = function (a) {
    this.heap.forEach(a);
};
buckets.Set = function (a) {
    this.dictionary = new buckets.Dictionary(a);
};
buckets.Set.prototype.contains = function (a) {
    return this.dictionary.containsKey(a);
};
buckets.Set.prototype.add = function (a) {
    if (this.contains(a) || buckets.isUndefined(a)) return !1;
    this.dictionary.set(a, a);
    return !0;
};
buckets.Set.prototype.intersection = function (a) {
    var b = this;
    this.forEach(function (c) {
        a.contains(c) || b.remove(c);
    });
};
buckets.Set.prototype.union = function (a) {
    var b = this;
    a.forEach(function (a) {
        b.add(a);
    });
};
buckets.Set.prototype.difference = function (a) {
    var b = this;
    a.forEach(function (a) {
        b.remove(a);
    });
};
buckets.Set.prototype.isSubsetOf = function (a) {
    if (this.size() > a.size()) return !1;
    var b = !0;
    this.forEach(function (c) {
        if (!a.contains(c)) return (b = !1);
    });
    return b;
};
buckets.Set.prototype.remove = function (a) {
    return this.contains(a) ? (this.dictionary.remove(a), !0) : !1;
};
buckets.Set.prototype.forEach = function (a) {
    this.dictionary.forEach(function (b, c) {
        return a(c);
    });
};
buckets.Set.prototype.toArray = function () {
    return this.dictionary.values();
};
buckets.Set.prototype.isEmpty = function () {
    return this.dictionary.isEmpty();
};
buckets.Set.prototype.size = function () {
    return this.dictionary.size();
};
buckets.Set.prototype.clear = function () {
    this.dictionary.clear();
};
buckets.Bag = function (a) {
    this.toStrF = a || buckets.defaultToString;
    this.dictionary = new buckets.Dictionary(this.toStrF);
    this.nElements = 0;
};
buckets.Bag.prototype.add = function (a, b) {
    if (isNaN(b) || buckets.isUndefined(b)) b = 1;
    if (buckets.isUndefined(a) || 0 >= b) return !1;
    this.contains(a) ? (this.dictionary.get(a).copies += b) : this.dictionary.set(a, { value: a, copies: b });
    this.nElements += b;
    return !0;
};
buckets.Bag.prototype.count = function (a) {
    return this.contains(a) ? this.dictionary.get(a).copies : 0;
};
buckets.Bag.prototype.contains = function (a) {
    return this.dictionary.containsKey(a);
};
buckets.Bag.prototype.remove = function (a, b) {
    if (isNaN(b) || buckets.isUndefined(b)) b = 1;
    if (!(buckets.isUndefined(a) || 0 >= b) && this.contains(a)) {
        var c = this.dictionary.get(a);
        this.nElements = b > c.copies ? this.nElements - c.copies : this.nElements - b;
        c.copies -= b;
        0 >= c.copies && this.dictionary.remove(a);
        return !0;
    }
    return !1;
};
buckets.Bag.prototype.toArray = function () {
    for (var a = [], b = this.dictionary.values(), c = b.length, d = 0; d < c; d++) for (var e = b[d], f = e.value, e = e.copies, g = 0; g < e; g++) a.push(f);
    return a;
};
buckets.Bag.prototype.toSet = function () {
    for (var a = new buckets.Set(this.toStrF), b = this.dictionary.values(), c = b.length, d = 0; d < c; d++) a.add(b[d].value);
    return a;
};
buckets.Bag.prototype.forEach = function (a) {
    this.dictionary.forEach(function (b, c) {
        for (var d = c.value, e = c.copies, f = 0; f < e; f++) if (!1 === a(d)) return !1;
        return !0;
    });
};
buckets.Bag.prototype.size = function () {
    return this.nElements;
};
buckets.Bag.prototype.isEmpty = function () {
    return 0 === this.nElements;
};
buckets.Bag.prototype.clear = function () {
    this.nElements = 0;
    this.dictionary.clear();
};
buckets.BSTree = function (a) {
    this.root = null;
    this.compare = a || buckets.defaultCompare;
    this.nElements = 0;
};
buckets.BSTree.prototype.add = function (a) {
    return buckets.isUndefined(a) ? !1 : null !== this.insertNode(this.createNode(a)) ? (this.nElements++, !0) : !1;
};
buckets.BSTree.prototype.clear = function () {
    this.root = null;
    this.nElements = 0;
};
buckets.BSTree.prototype.isEmpty = function () {
    return 0 === this.nElements;
};
buckets.BSTree.prototype.size = function () {
    return this.nElements;
};
buckets.BSTree.prototype.contains = function (a) {
    return buckets.isUndefined(a) ? !1 : null !== this.searchNode(this.root, a);
};
buckets.BSTree.prototype.remove = function (a) {
    a = this.searchNode(this.root, a);
    if (null === a) return !1;
    this.removeNode(a);
    this.nElements--;
    return !0;
};
buckets.BSTree.prototype.inorderTraversal = function (a) {
    this.inorderTraversalAux(this.root, a, { stop: !1 });
};
buckets.BSTree.prototype.preorderTraversal = function (a) {
    this.preorderTraversalAux(this.root, a, { stop: !1 });
};
buckets.BSTree.prototype.postorderTraversal = function (a) {
    this.postorderTraversalAux(this.root, a, { stop: !1 });
};
buckets.BSTree.prototype.levelTraversal = function (a) {
    this.levelTraversalAux(this.root, a);
};
buckets.BSTree.prototype.minimum = function () {
    return this.isEmpty() ? void 0 : this.minimumAux(this.root).element;
};
buckets.BSTree.prototype.maximum = function () {
    return this.isEmpty() ? void 0 : this.maximumAux(this.root).element;
};
buckets.BSTree.prototype.forEach = function (a) {
    this.inorderTraversal(a);
};
buckets.BSTree.prototype.toArray = function () {
    var a = [];
    this.inorderTraversal(function (b) {
        a.push(b);
    });
    return a;
};
buckets.BSTree.prototype.height = function () {
    return this.heightAux(this.root);
};
buckets.BSTree.prototype.searchNode = function (a, b) {
    for (var c = null; null !== a && 0 !== c; ) (c = this.compare(b, a.element)), 0 > c ? (a = a.leftCh) : 0 < c && (a = a.rightCh);
    return a;
};
buckets.BSTree.prototype.transplant = function (a, b) {
    null === a.parent ? (this.root = b) : a === a.parent.leftCh ? (a.parent.leftCh = b) : (a.parent.rightCh = b);
    null !== b && (b.parent = a.parent);
};
buckets.BSTree.prototype.removeNode = function (a) {
    if (null === a.leftCh) this.transplant(a, a.rightCh);
    else if (null === a.rightCh) this.transplant(a, a.leftCh);
    else {
        var b = this.minimumAux(a.rightCh);
        b.parent !== a && (this.transplant(b, b.rightCh), (b.rightCh = a.rightCh), (b.rightCh.parent = b));
        this.transplant(a, b);
        b.leftCh = a.leftCh;
        b.leftCh.parent = b;
    }
};
buckets.BSTree.prototype.inorderTraversalAux = function (a, b, c) {
    null === a || c.stop || (this.inorderTraversalAux(a.leftCh, b, c), c.stop || ((c.stop = !1 === b(a.element)), c.stop || this.inorderTraversalAux(a.rightCh, b, c)));
};
buckets.BSTree.prototype.levelTraversalAux = function (a, b) {
    var c = new buckets.Queue();
    for (null !== a && c.enqueue(a); !c.isEmpty(); ) {
        a = c.dequeue();
        if (!1 === b(a.element)) break;
        null !== a.leftCh && c.enqueue(a.leftCh);
        null !== a.rightCh && c.enqueue(a.rightCh);
    }
};
buckets.BSTree.prototype.preorderTraversalAux = function (a, b, c) {
    null === a || c.stop || ((c.stop = !1 === b(a.element)), c.stop || (this.preorderTraversalAux(a.leftCh, b, c), c.stop || this.preorderTraversalAux(a.rightCh, b, c)));
};
buckets.BSTree.prototype.postorderTraversalAux = function (a, b, c) {
    null === a || c.stop || (this.postorderTraversalAux(a.leftCh, b, c), c.stop || (this.postorderTraversalAux(a.rightCh, b, c), c.stop || (c.stop = !1 === b(a.element))));
};
buckets.BSTree.prototype.minimumAux = function (a) {
    for (; null !== a.leftCh; ) a = a.leftCh;
    return a;
};
buckets.BSTree.prototype.maximumAux = function (a) {
    for (; null !== a.rightCh; ) a = a.rightCh;
    return a;
};
buckets.BSTree.prototype.successorNode = function (a) {
    if (null !== a.rightCh) return this.minimumAux(a.rightCh);
    for (var b = a.parent; null !== b && a === b.rightCh; ) (a = b), (b = a.parent);
    return b;
};
buckets.BSTree.prototype.heightAux = function (a) {
    return null === a ? -1 : Math.max(this.heightAux(a.leftCh), this.heightAux(a.rightCh)) + 1;
};
buckets.BSTree.prototype.insertNode = function (a) {
    for (var b = null, c = this.root, d = null; null !== c; ) {
        d = this.compare(a.element, c.element);
        if (0 === d) return null;
        0 > d ? ((b = c), (c = c.leftCh)) : ((b = c), (c = c.rightCh));
    }
    a.parent = b;
    null === b ? (this.root = a) : 0 > this.compare(a.element, b.element) ? (b.leftCh = a) : (b.rightCh = a);
    return a;
};
buckets.BSTree.prototype.createNode = function (a) {
    return { element: a, leftCh: null, rightCh: null, parent: null };
};
"undefined" !== typeof module && (module.exports = buckets);
