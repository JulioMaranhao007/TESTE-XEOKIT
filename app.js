import {Viewer, WebIFCLoaderPlugin, NavCubePlugin, TreeViewPlugin, FastNavPlugin} from 
"./node_modules/@xeokit/xeokit-sdk/dist/xeokit-sdk.es.js";

// Create a New Viewer
const viewer = new Viewer({
    canvasId: "myCanvas", // Element to receive
    transparent: true
});

// Setting initial camera position
viewer.camera.eye = [-3.933, 2.855, 27.018];
viewer.camera.look = [4.400, 3.724, 8.899];
viewer.camera.up = [-0.018, 0.999, 0.039];

// Create camera control events
const cameraControl = viewer.cameraControl;
cameraControl.navMode = "orbit";

//Managing Camera control Events
cameraControl.on("picked", (e) => {
    const entity = e.entity;
    console.log(entity.id);
    entity.xrayed = true;
});

// Create a instance of Loader Plugin
const webIFCLoader = new WebIFCLoaderPlugin(viewer, {
    // Path to web-ifc.wasm, which does the IFC parsing for us
    wasmPath: "./node_modules/@xeokit/xeokit-sdk/dist/"
});

// Create a NavCube instance
const navCube = new NavCubePlugin(viewer, {
    canvasId: "myNavCubeCanvas",
    visible: true,         // Initially visible (default)
    cameraFly: true,       // Fly camera to each selected axis/diagonal
    cameraFitFOV: 45,      // How much field-of-view the scene takes once camera has fitted it to view
    cameraFlyDuration: 0.5,// How long (in seconds) camera takes to fly to each new axis/diagonal
    fitVisible: false,     // Fit whole scene, including invisible objects (default)
    synchProjection: true // Keep NavCube in perspective projection, even when camera switches to ortho (default)
});

// Create a auto TreeView add PLugin
new FastNavPlugin(viewer);

// Create a TreeView instance
const treeView = new TreeViewPlugin(viewer, {
    containerElement: document.getElementById("myTreeViewContainer"),
    autoExpandDepth: 1,
    hierarchy: "containment"
});

// Load Model .ifc into Viewer
const model = webIFCLoader.load({ // Returns an Entity that represents the model
    src: "84696-IES-PT-PROJ_VBL-01 (1).ifc",
    edges: true
});

//window.viewer = viewer;


