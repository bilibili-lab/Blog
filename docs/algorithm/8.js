class Node {
    constructor(element) {
        this.value = element;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null; // 头指针
        this.count = 0;  // 链表的个数
    }
    /** 添加元素 */
    push(element) {
        const node = new Node(element);
        /** 判断头指针是否存在 */
        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++
    }
    remove(index) {
        // 检查临界值
        if (index >= 0 && index < this.count) {
            let current = this.head;
            // 移除第一项
            if (index === 0) {
                this.head = current.next
            } else {
                let previous
                for (let i = 0; i < index; i++) {
                    previous = current
                    current = current.next;
                }
                // 将previous 与 current.next 连接起来； 跳过current，从而移除它；
                previous.next = current.next;
            }
            this.count--
            return current.element

        }
        return undefined
    }
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 0; i < index && node !== null; i++) {
                node = node.next
            }
            return node;
        }
        return undefined;
    }
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element)
            if (index === 0) {
                let current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1)
                const current = previous.next;
                node.next = current
                previous.next = node;
            }
            this.count++;
            return true;
        }
    }
    indexof(element) {
        let current = this.head
        for (let i = 0; i < this.count && node !== null; i++) {
            if (current.element === element) return i
            current = current.next;
        }
        return -1
    }
    size() {
        return this.count
    }
    isEmpty() {
        return this.size() === 0
    }
    getHead() {
        return this.head
    }
}