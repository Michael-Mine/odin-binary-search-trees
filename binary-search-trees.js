import { mergeSort } from "./merge-sort.js";

function Node(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

function Tree(array) {
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

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = Tree(testArray);
console.log(bst);
prettyPrint(bst.root);
