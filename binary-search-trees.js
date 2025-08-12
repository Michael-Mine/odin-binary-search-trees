import { mergeSort } from "./merge-sort.js";

function Node(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

function Tree(array) {
  if (!Array.isArray(array) || array.length === 0) return null;
  let sortedArray = mergeSort(array);
  // remove duplicates as more complicated as trees harder to balance
  let filteredArray = [...new Set(sortedArray)];
  console.log(filteredArray);

  return { root: buildTree(filteredArray, 0, filteredArray.length - 1) };
}

function buildTree(array, start, end) {
  if (start > end) return null;

  let mid = start + Math.floor((end - start) / 2);
  let root = Node(array[mid]);

  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function insert(root, value) {
  if (root === null) return Node(value);

  if (root.data === value) return root;

  if (value < root.data) {
    console.log("left");
    root.left = insert(root.left, value);
  } else if (value > root.data) {
    console.log("right");
    root.right = insert(root.right, value);
  }
  return root;
}

function getSuccessor(curr) {
  curr = curr.right;
  while (curr !== null && curr.left !== null) {
    curr = curr.left;
  }
  return curr;
}

function deleteItem(root, value) {
  if (root === null) return root;

  if (root.data > value) {
    root.left = deleteItem(root.left, value);
  } else if (root.data < value) {
    root.right = deleteItem(root.right, value);
  } else {
    // If root matches with value

    // Cases when root has 0 children or only right child
    if (root.left === null) return root.right;

    // Cases when root has only left child
    if (root.right === null) return root.left;

    //When both children are present
    let succ = getSuccessor(root);
    root.data = succ.data;
    root.right = deleteItem(root.right, succ.data);
  }
  return root;
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let bst = Tree(testArray);
prettyPrint(bst.root);
// bst = insert(bst.root, 10);
// prettyPrint(bst);
bst = deleteItem(bst.root, 4);
prettyPrint(bst);
