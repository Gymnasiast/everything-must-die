everythingMustDie = {};

// #3526: Make vandalism
var destroyPathFurnitureGA = function(isExecuting, args)
{
    if (isExecuting)
    {
        for (var y = 0; y < map.size.y; y++) {
            for (var x = 0; x < map.size.x; x++) {
                var tile = map.getTile(x, y);

                for (var i = 0; i < tile.numElements; i++) {
                    var element = tile.getElement(i);

                    if (element.type === 'footpath') {
                        element.isAdditionBroken = true;
                    }
                }
            }
        }
    }

    return {
        cost: 0,
        expenditureType: "landscaping",
        position: {
            x: -1,
            y: -1,
            z: 0
        }
    }
}

var destroyPathFurniture = function()
{
    context.executeAction("emd-destroy-path-furniture", {}, function() {});

}

// Exact replication of the EXPLODE!!! cheat.
var explodeGA = function(isExecuting, args)
{
    if (isExecuting)
    {
        for (var i = 0; i < map.numEntities; i++)
        {
            var entity = map.getEntity(i);
            if (!entity)
            {
                continue;
            }

            var entityIsGuest = entity.type === 'peep' && entity.peepType === "guest";

            if (entityIsGuest && context.getRandom(0, 6) === 0)
            {
                entity.setFlag("explode", true);
            }
        }
    }
    
    return {
        cost: 0,
        expenditureType: "landscaping",
        position: {
            x: -1,
            y: -1,
            z: 0 
        }
    }
}

var explode = function()
{
    context.executeAction("emd-explode-guests", {}, function() {});
}

var main = function() 
{
    context.registerAction(
        "emd-destroy-path-furniture",
        function(args) {
            return destroyPathFurnitureGA(false, args);
        },
        function(args) {
            return destroyPathFurnitureGA(true, args);
        }
    );
    context.registerAction(
        "emd-explode-guests",
        function(args) {
            return explodeGA(false, args);
        },
        function(args) {
            return explodeGA(true, args);
        }
    );
    
    ui.registerMenuItem("Destroy path furniture", destroyPathFurniture);
    ui.registerMenuItem("Explode guests", explode);
};

registerPlugin({
    name: 'Everything must die',
    version: '0.1.0',
    authors: ['Gymnasiast'],
    licence: 'MIT',
    type: 'remote',
    main: main
});
