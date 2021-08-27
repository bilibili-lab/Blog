class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }
    /** 插入节点  */
    insert(key) {
        // 判断根节点是否存在
        if (this.root === null) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }
    insertNode(node, key) {
        if (node.key <= key) {
            if (node.left === null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right === null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }
    /** 中序遍历  */
    inOrderTraverse(callback) {
        this.inOrderTraverse(this.root, callback);
    }
    inOrderTraverseNode(node, callback) {
        if (node) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    /** 前序遍历  */
    prevOrderTraverse() {
        this.prevOrderTraverseNode(this.root, callback)
    }
    prevOrderTraverseNode(node, callback) {
        if (node) {
            this.prevOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.prevOrderTraverseNode(node.right, callback);
        }
    }
    /** 后序遍历  */
    postOrderTraverse() {
        this.postOrderTraverseNode(this.root, callback)
    }
    postOrderTraverseNode(node, callback) {
        if (node) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    /** 查找最小值  */
    min() {
        this.minNode(this.root)
    }
    minNode(node) {
        let current = node;
        while (current !== null && current.left !== null) {
            current = current.left;
        }
        return current;
    }
    /** 获取最大值  */
    max() {
        this.maxNode(this.root)
    }
    maxNode(node) {
        let current = node;
        while (current !== null && current.right !== null) {
            current = current.right
        }
        return current
    }
    /** 搜索一个节点  */
    search(key) {
        return this.searchNode(this.root, key)
    }
    searchNode(node, key) {
        if (node === null) return false
        if (key < node.key) {
            return this.searchNode(node.left, key)
        } else if (key > node.key) {
            return this.searchNode(node.right, key)
        } else {
            return true
        }
    }
    remove(key) {
        return this.removeNode(this.root, key)
    }
    removeNode(node, key) {
        if (node === null) {
            return null
        }
        if (key < node.key) { // 在左节点
            return this.removeNode(node.left, key)
        } else if (key > node.key) {  // 在右节点
            return this.removeNode(node.right, key)
        } else {  //  node.key === key
            //删除的是一个叶子节点
            if (node.left === null && node.right === null) {
                node = null
                return node
            }
            // 左侧节点为null，右侧不为null
            if (node.left === null) {
                node = node.right
                return node
            }
            // 右侧节点为null，左侧不为null
            if (node.right === null) {
                node = node.left
                return node
            }
            // 移除既有左侧节点和右侧节点
            let aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, node.key)
            return node
        }
    }

}

