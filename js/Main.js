/*
Licensed under the MIT license.
http://www.opensource.org/licenses/mit-license.php

this file is part of HTMoL:
Copyright (C) 2014  Alvarez Rivera Leonardo,Becerra Toledo Francisco Javier, Vega Ramirez Adan
*/
var zoom,data,MainMenu;
function Main()
{
	var main=this;
	var ObjRepresentation= new Representation();
	this.ObjP= new Process(ObjRepresentation);
	this.Obj3D= new THREED(ObjRepresentation,main,main.ObjP);
    this.menu;

    var Container=null;
    var molecule;

	this.Model= function(url)
	{
	    return function(event){
	   	try{
	   	main.DeleteModel();
	    main.MakeModel(url);   
		}catch(e)
		{
			data.innerHTML='Error: Invalid URL or Connection not available';
		}
	   }
	}
	
	this.MakeModel=function(url)
	{
	   main.ObjP.CameraZ=10;
	   molecule=main.ObjP.ReadFile(url);	   
	   if(molecule!=null)
	   {
	   	   data.innerHTML="Loading...";
	   	   window.setTimeout(function(){
	   	   var chain=molecule.GetChain();
		   main.Obj3D.molecule=molecule;
		   ObjRepresentation.molecule=molecule;
		   PredictionAndCamera();

		   main.ObjP.Spheres(chain,main.Obj3D);
		   main.ObjP.representation.Bonds.MakeBonds(main.ObjP,main.Obj3D);
		   main.ObjP.representation.Skeleton.Make(main.Obj3D);

		   main.Obj3D.CenterObjects(main.ObjP.PointCenter.X,main.ObjP.PointCenter.Y,main.ObjP.PointCenter.Z);
		   main.Obj3D.DeleteButtons();
		   main.Obj3D.Buttons(molecule);
		   data.innerHTML="";
	   	   },50);
	   }
	   else{
	   	data.innerHTML='Error: Invalid URL or Connection not available';
	   }
	}

	function PredictionAndCamera()
	{
		if(main.ObjP.bndPDB==true)
		    main.ObjP.SecondaryStructureByPDB();
		   else
		    main.ObjP.AlgorithmGOR();

		   main.DefaultRepresentation();

		   main.Obj3D.camera.position.x=0;
		   main.Obj3D.camera.position.y=0;
		   main.Obj3D.camera.position.z=main.ObjP.CameraZ*1.7;
	}

	this.DeleteModel=function()
	{
		main.ObjP.representation.CPK.Delete(main.Obj3D.scene);
		main.ObjP.representation.SpheresBonds.Delete(main.Obj3D.scene);
		main.ObjP.representation.Skeleton.Delete(main.Obj3D.scene);
		main.ObjP.representation.Bonds.Delete(main.Obj3D.scene);
		main.Obj3D.DeleteMarkers();
		main.Obj3D.DeleteMeasures();
		main.Obj3D.DeleteButtons();
	}


	this.DefaultRepresentation=function()
	{
		main.ObjP.representation.CPK.Bnd=false;
		main.ObjP.representation.SpheresBonds.Bnd=false;
		main.ObjP.representation.Skeleton.Bnd=true;
		main.ObjP.representation.Bonds.Bnd=false;
	}

	this.MakeMenu=function(container)
	{
		var hope="<link rel='stylesheet' type='text/css' href='styles/component.css' /><link rel='stylesheet' type='text/css' href='styles/Styles.css' /><div id='Menus'><div id='zoom'></div><div id='menu'></div></div><div id='MainMenu'><div id='dl-menu' class='dl-menuwrapper'> <button class='dl-trigger'>Open Menu</button> <ul class='dl-menu'> <li><a href='#'>Open</a><UL  id='Molecule' class='dl-submenu'></UL></li><li><a href='#'>Select</a> <ul class='dl-submenu'> <li><a href='#'>Aminoacid</a> <ul id='sub-Amin' class='dl-submenu'> <li><a href='#' id='ALA'>ALA</a></li> <li><a href='#' id='ARG'>ARG</a></li> <li><a href='#' id='ASN'>ASN</a></li> <li><a href='#' id='ASP'>ASP</a></li> <li><a href='#' id='CYS'>CYS</a></li> <li><a href='#' id='GLN'>GLN</a></li> <li><a href='#' id='GLU'>GLU</a></li> <li><a href='#' id='GLY'>GLY</a></li> <li><a href='#' id='HIS'>HIS</a></li> <li><a href='#' id='ILE'>ILE</a></li> <li><a href='#' id='LEU'>LEU</a></li> <li><a href='#' id='LYS'>LYS</a></li> <li><a href='#' id='MET'>MET</a></li> <li><a href='#' id='PHE'>PHE</a></li> <li><a href='#' id='PRO'>PRO</a></li> <li><a href='#' id='SER'>SER</a></li> <li><a href='#' id='THR'>THR</a></li> <li><a href='#' id='TRP'>TRP</a></li> <li><a href='#' id='TYR'>TYR</a></li> <li><a href='#' id='VAL'>VAL</a></li> </ul> </li> <li> <a href='#'>Atom</a> <ul id='sub-Atom' class='dl-submenu'> <li><a href='#' id='C'>C</a></li> <li><a href='#' id='H'>H</a></li> <li><a href='#' id='O'>0</a></li> <li><a href='#' id='PB'>PB</a></li> <li><a href='#' id='TI'>TI</a></li> <li><a href='#' id='N'>N</a></li> <li><a href='#' id='S'>S</a></li> <li><a href='#' id='P'>P</a></li> </ul> </li> <li> <a href='#'>Color</a> <ul id='sub-color'class='dl-submenu'> <li><a href='#' id='Yellow'>Yellow</a></li> <li><a href='#' id='Red'>Red</a></li> <li><a href='#' id='Orange'>Orange</a> </li> <li><a href='#' id='Blue'>Blue</a></li> <li><a href='#' id='BlueSky'>Blue Sky</a></li> <li><a href='#' id='Green'>Green</a></li> <li><a href='#' id='Purple'>Purple</a></li> <li><a href='#' id='Pink'>Pink</a></li> <li><a href='#' id='Gray'>Gray</a></li> <li><a href='#' id='Brown'>Brown</a></li> <li><a href='#' id='DefaultColor'>Default</a></li> </ul> </li> <li><a href='#' id='All'>All</a></li> <li><a href='#' id='Show'>Show</a></li> </ul> </li> <li><a href='#'>Actions</a> <ul class='dl-submenu'> <li><a href='#'>View</a> <ul class='dl-submenu'> <li><a href='#' id='F'>Front</a></li> <li><a href='#' id='L'>Left</a></li> <li><a href='#' id='R'>Right</a></li> <li><a href='#' id='U'>Up</a></li> <li><a href='#' id='D'>Down</a></li> <li><a href='#' id='B'>Back</a></li> </ul> </li> <li><a href='#'>Markers</a> <ul class='dl-submenu'> <li><a href='#' id='ShowMarkers'>Show Markers</a></li> <li><a href='#' id='HideMarkers'>Hide Markers</a></li> <li><a href='#' id='DeleteMarkers'>Delete Markers</a></li> </ul> </li> <li><a title='Atom Select' href='#'>A.Selected</a> <ul class='dl-submenu'> <li><a href='#' id='NameAtom'>Name Atom</a></li> <li><a href='#' id='NumberAtom'>Number Atom</a></li> <li><a href='#' id='DetailsAtom'>Details Atom</a></li> <li><a href='#' id='Center'>Center Atom</a></li> <li><a href='#' id='Identify'>Identify</a></li> <li><a href='#' id='None1'>None</a></li> </ul> </li> <li><a href='#'>Measures</a> <ul class='dl-submenu'> <li><a href='#' id='Distance'>Distance</a></li> <li><a href='#' id='Angle'>Angle</a></li> <li><a href='#' id='None2'>None</a></li> <li><a href='#' id='DeleteMeasures'>Delete Measures</a></li> </ul> </li> <li><a href='#'  title='Helix and Sheet' id='ViewHS'>H & S</a></li> <li><a href='#' id='Axis'>Axis</a></li><li><a href='#' title='Molecule Center' id='MoleculeCenter'>M.Center</a></li></ul></li><li><a href='#'>Representations</a> <ul class='dl-submenu'> <li><a href='#' id='CPK'>CPK</a></li> <li><a href='#' id='Bonds'>Bonds</a></li> <li><a href='#' title='Spheres Bonds' id='Spheres Bonds'>S.Bonds</a></li> <li><a href='#' id='Skeleton'>Skeleton</a></li> </ul> </li> </ul> </div></div>"
		document.getElementById('WebGL-Out').innerHTML = hope; 
		var tagjs = document.createElement("script");       
      	tagjs.setAttribute("src", "fonts/optimer_regular.typeface.js");
      	document.getElementsByTagName("head")[0].appendChild(tagjs);
		Container=container;
		Container.onmouseover=function (){main.Obj3D.updatecontrols=true};
        Container.onmouseout=function (){main.Obj3D.updatecontrols=false};
		var Menus = document.getElementById("Menus");
  		main.menu=document.getElementById("menu");
		var webgl = document.getElementById("WebGL-Out");
  		MainMenu = document.getElementById('div');
  		data = document.getElementById("data");
  		zoom = document.getElementById("zoom");

  		
        if(typeof(URLS) != "undefined")
        	{ 
        		 for(var i in URLS)
			    {		
			    	var button = document.getElementById( "Molecule" ); 
		        	button.innerHTML+='<li><a href="#" id="new"></a></li>';	

		        	button = document.getElementById("new"); 
		        	button.id=URLS[i].name;
		        	button.innerHTML=URLS[i].name;
			    }
		  
        	}
		else{ 
			URLS = null;
			}
	    var button = document.getElementById( "Molecule" ); 
        button.innerHTML+='<li><a href="#" id="ByURL">By URL</a></li>';
        button = document.getElementById( "ByURL" ); 
        button.onclick=this.ScenebyURL();
        
      
        for(var i in URLS)
	    {		
	    	var button = document.getElementById( URLS[i].name ); 
        	button.onclick=this.Model(URLS[i].url);
	    }
		
		var o=0;
	    main.Obj3D.MakeScene(Container);
	    
	    if(typeof(URLS) != "undefined")
        { 
		    for(var i in URLS)
		    {
			    if (o==0) 
			    {
			    	main.DeleteModel();
					main.MakeModel(URLS[i].url);
				}
				o++;
			}
		}

	    main.Obj3D.Rendering(webgl); 

	}

	this.Scene=function(url)
	{
	    return function(event)
	    {
	    main.Model(url);
	    }
	}
	
	this.ScenebyURL=function()
	{
        return function(event)
        {
        	var url = prompt("URL: ", "http://www.rcsb.org/pdb/files/1CRN.pdb");
		    if(url!=''){
			if(url.length==4)
			url="http://www.rcsb.org/pdb/files/"+url+".pdb";
		    try{
			main.DeleteModel();
		    main.MakeModel(url); 
		    }catch(e)
			{
				data.innerHTML='Error: Invalid URL or Connection not available';
			}
		     }
		     
		}
	}
}

$(function ()
{
var main= new Main();
var container = document.getElementById("Contenedor");
//main.SetBackgroundColor(0xff0000);
main.MakeMenu(container);

});