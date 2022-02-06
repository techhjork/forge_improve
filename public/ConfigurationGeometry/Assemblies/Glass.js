import { PlaceComponent, Color, Functions, Features, PositionPart } from '../../CadcraftForgeUtils/CadcraftForgeUtils.js';
import CommonFunctions from '../Common/CommonFunctions.js';
import Panel from '../Parts/Panel.js'
import GlassPart from '../Parts/GlassPart.js'
import GlassFrame from '../Parts/GlassFrame.js'
import GlassFrameDivide from '../Parts/GlassFrameDivide.js'

let Glass = function (scene, zone, color) {

    let components = [];


    //components.push(PlaceComponent.Part(new GlassPart(zone.zoneWidth - 100, zone.zoneSize - 100, 20), 50, 50, -20, 0, 0, 0, Color.SmookeGlass(), scene, "Glass"));
    components.push(PlaceComponent.Part(new GlassFrame(zone.zoneWidth, zone.zoneSize, 20), 0, 0, 0, 0, 0, 0, Color.Aluminium(), scene, "GlassFrame"));

    if (zone.zoneSide === 'a') {
        components.push(PlaceComponent.Part(new GlassPart(zone.zoneWidth - 300, zone.zoneSize - 100, 15), 200 + 50, 50, -5, 0, 0, 0, Color.SmookeGlass(), scene, "Glass"));
        components.push(PlaceComponent.Part(new GlassFrameDivide(50, zone.zoneSize, 20), 200, 0, 0, 0, 0, 0, Color.Aluminium(), scene, "GlassFrameDivide"));
        components.push(PlaceComponent.Part(new Panel(150, zone.zoneSize - 100, 15), 50, 50, -5, 0, 0, 0, Color.GetColorByRAL(color), scene, "Panel"));
    } else if (zone.zoneSide === 'b') {
        components.push(PlaceComponent.Part(new GlassPart(zone.zoneWidth - 100, zone.zoneSize - 100, 15), 50, 50, -5, 0, 0, 0, Color.SmookeGlass(), scene, "Glass"));


    } else if (zone.zoneSide === 'c') {
        components.push(PlaceComponent.Part(new GlassPart(zone.zoneWidth - 300, zone.zoneSize - 100, 15), 50, 50, -5, 0, 0, 0, Color.SmookeGlass(), scene, "Glass"));
        components.push(PlaceComponent.Part(new GlassFrameDivide(50, zone.zoneSize, 20), zone.zoneWidth - 200 - 50, 0, 0, 0, 0, 0, Color.Aluminium(), scene, "GlassFrame"));
        components.push(PlaceComponent.Part(new Panel(150, zone.zoneSize - 100, 15), zone.zoneWidth - 200, 50, -5, 0, 0, 0, Color.GetColorByRAL(color), scene, "Panel"));

    } else if (zone.zoneSide === 'd') {
        components.push(PlaceComponent.Part(new GlassPart(zone.zoneWidth - 450, zone.zoneSize - 100, 15), 200+50, 50, -5, 0, 0, 0, Color.SmookeGlass(), scene, "Glass"));
        components.push(PlaceComponent.Part(new GlassFrameDivide(50, zone.zoneSize, 20), 200, 0, 0, 0, 0, 0, Color.Aluminium(), scene, "GlassFrame"));
        components.push(PlaceComponent.Part(new GlassFrameDivide(50, zone.zoneSize, 20), zone.zoneWidth - 200 - 50, 0, 0, 0, 0, 0, Color.Aluminium(), scene, "GlassFrame"));
        components.push(PlaceComponent.Part(new Panel(150, zone.zoneSize - 100, 15), 50, 50, -5, 0, 0, 0, Color.GetColorByRAL(color), scene, "Panel"));
        components.push(PlaceComponent.Part(new Panel(150, zone.zoneSize - 100, 15), zone.zoneWidth - 200, 50, -5, 0, 0, 0, Color.GetColorByRAL(color), scene, "Panel"));


    }

   
   

   
    return components
}

export default Glass